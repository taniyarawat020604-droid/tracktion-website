import Audiences from "@/components/Audiences";
import Careers from "@/components/Careers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Story from "@/components/Story";
import Team from "@/components/Team";

const ticker = ["Personal branding", "LinkedIn ghostwriting", "Instagram Reels", "YouTube", "Podcasts", "Founder branding", "B2B content"];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="-rotate-1 border-y border-lime bg-lime py-4 text-ink"><Marquee items={ticker} /></div>
        <Story />
        <Stats />
        <Audiences />
        <Services />
        <Process />
        <Team />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
