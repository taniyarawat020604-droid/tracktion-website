// Everything here comes from Tracktion's public LinkedIn page, except where marked PLACEHOLDER.

export const LINKEDIN = "https://in.linkedin.com/company/tracktion-media";

export const platforms = ["LinkedIn", "Instagram", "YouTube", "X"] as const;

// Tracktion's own accounts. Add Instagram / YouTube / X here once they exist.
export const socials = [{ label: "LinkedIn", href: LINKEDIN }];

export const audiences = [
  { tag: "/founders", title: "Startup founders", body: "Build trust with investors, hires and customers before the first call." },
  { tag: "/creators", title: "Creators", body: "Turn a following into a business with content that compounds." },
  { tag: "/finance", title: "Finance professionals", body: "Make complex money topics clear, credible and easy to share." },
  { tag: "/healthcare", title: "Healthcare brands", body: "Educate patients and stand out in a careful, crowded category." },
  { tag: "/leaders", title: "Industry leaders", body: "Turn decades of experience into a voice the industry listens to." },
  { tag: "/podcasters", title: "Podcasters", body: "One conversation, cut into a week of clips, quotes and posts." },
];

// Service descriptions are PLACEHOLDER copy written from the specialties LinkedIn lists.
export const services = [
  { key: "in", platform: "LinkedIn", title: "Content strategy & ghostwriting", body: "We learn how you think, then write posts in your voice. You approve, we publish, and your network fills with people who can buy, invest or join.", tags: ["Ghostwriting", "Carousels", "Content calendar", "Comment strategy"] },
  { key: "pr", platform: "LinkedIn · Instagram", title: "Profile optimisation", body: "Your profile is the landing page for every post. Headlines, banners, featured sections and bios that explain who you are in five seconds.", tags: ["Headline & About", "Banner design", "Featured", "Bio links"] },
  { key: "ig", platform: "Instagram", title: "Reels production", body: "Short videos built around a strong hook. We script, direct the shoot, edit and caption so every reel feels native to the feed.", tags: ["Scripting", "Shoot direction", "Editing", "Captions"] },
  { key: "yt", platform: "YouTube", title: "Long-form video", body: "Deep-dive videos that rank in search and keep working for years. Topics, structure, editing, thumbnails and titles.", tags: ["Topic research", "Editing", "Thumbnails", "SEO titles"] },
  { key: "pod", platform: "Podcast", title: "Podcast production", body: "From guest planning to the final mix. Every episode is cut into clips and posts for every platform you're on.", tags: ["Guest planning", "Audio & video", "Clips", "Distribution"] },
  { key: "cd", platform: "All platforms", title: "Creative direction & consulting", body: "For teams who want to build in-house. We set the voice, the visual system and the workflow, then coach your team.", tags: ["Brand voice", "Visual system", "Training", "Monthly reviews"] },
];

// From Rishi Jain's post on the company page, paraphrased.
export const story = [
  { when: "January", line: "Hardik quits his job to go all in. Rishi is still employed and not sure it will work." },
  { when: "Month 1", line: "Total revenue: ₹20,000. No clients, no office, no proof." },
  { when: "Every night", line: "They work out of Rishi's flat and pitch strangers on LinkedIn." },
  { when: "Client 1", line: "The first client's posts go massively viral. Then a second client signs, then a third." },
  { when: "Month 9", line: "Their own office in Delhi. 18+ clients, a listed company on the roster, and a team." },
];

// PLACEHOLDER process copy.
export const process = [
  { title: "Audit", body: "We review your profiles, past content and competitors to find what's already working." },
  { title: "Positioning", body: "We pick the topics you'll own and the audience you're writing for." },
  { title: "Content engine", body: "Interviews, scripts, shoots and edits on a weekly rhythm." },
  { title: "Distribution", body: "Each idea becomes a post, a reel, a clip and an episode." },
  { title: "Traction", body: "Monthly reports, sharper hooks and a following that keeps growing." },
];

export const team = [
  { name: "Rishi Jain", role: "Co-founder", photo: "/team/rishi-jain.jpg", linkedin: "https://www.linkedin.com/in/rishijainrj" },
  { name: "Hardik Matta", role: "Co-founder", photo: "/team/hardik-matta.jpg", linkedin: "https://www.linkedin.com/in/hardik-matta-401b74255" },
  { name: "Ekansh Gulati", role: "Team", photo: "/team/ekansh-gulati.jpg", linkedin: "https://www.linkedin.com/in/ekanshgulati/" },
  { name: "Gaurav Chetnani", role: "Team", photo: "/team/gaurav-chetnani.jpg", linkedin: "https://www.linkedin.com/in/gaurav-chetnani13/" },
];
