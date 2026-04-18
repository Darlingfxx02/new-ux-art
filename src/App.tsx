import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Showreel } from "@/sections/Showreel";
import { Clients } from "@/sections/Clients";
import { Directions } from "@/sections/Directions";
// import { Team } from "@/sections/Team"; // временно отключён
import { Socials } from "@/sections/Socials";
import { Blog } from "@/sections/Blog";
import { CTA } from "@/sections/CTA";
import { HeroOutro } from "@/sections/HeroOutro";
import { ShowreelOutro } from "@/sections/ShowreelOutro";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

function App() {
  useSmoothScroll();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showreel />
        <Clients />
        <Directions />
        <Socials />
        <Blog />
        <HeroOutro />
        <ShowreelOutro />
        <CTA />
      </main>
    </>
  );
}

export default App;
