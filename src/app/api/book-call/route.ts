// Receives the "Book a call" form and appends it to a Google Sheet through an Apps Script web app.
// The script URL and secret stay on the server, so visitors never see them.

const EMAIL = /^\S+@\S+\.\S+$/;
const PLATFORMS = new Set(["LinkedIn", "Instagram", "YouTube", "X"]);

export async function POST(request: Request) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) return Response.json({ ok: false, error: "Booking isn't set up yet. Please message us on LinkedIn." }, { status: 500 });

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill the hidden "company_website" field.
  if (data.company_website) return Response.json({ ok: true });

  const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = str(data.name, 120);
  const email = str(data.email, 200);
  if (!name || !EMAIL.test(email)) return Response.json({ ok: false, error: "Add your name and a valid email." }, { status: 400 });

  const payload = {
    secret: process.env.GOOGLE_SCRIPT_SECRET ?? "",
    name,
    email,
    role: str(data.role, 80),
    platforms: Array.isArray(data.platforms) ? data.platforms.filter((p): p is string => typeof p === "string" && PLATFORMS.has(p)) : [],
    message: str(data.message, 2000),
    page: request.headers.get("referer") ?? "",
    userAgent: request.headers.get("user-agent") ?? "",
  };

  try {
    // Apps Script answers a POST with a redirect to the result; fetch follows it.
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), redirect: "follow", cache: "no-store" });
    const out = await res.json().catch(() => null);
    if (!res.ok || !out?.ok) {
      console.error("book-call: Apps Script rejected the submission", res.status, out);
      return Response.json({ ok: false, error: "We couldn't save your request. Please try again in a minute." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("book-call: could not reach Apps Script", err);
    return Response.json({ ok: false, error: "We couldn't save your request. Please try again in a minute." }, { status: 502 });
  }
}
