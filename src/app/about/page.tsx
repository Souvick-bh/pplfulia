import Hero from "./_components/Hero";
import Timeline from "./_components/Timeline";
import SeasonShowcase from "./_components/SeasonShowcase";
import Memories from "./_components/Memories";
import Footer from "./_components/Footer";


export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF8DC] text-[#111111]">

      <Hero />

      <Timeline />

      <SeasonShowcase />

      <Memories />

      <Footer />

    </main>
  );
}