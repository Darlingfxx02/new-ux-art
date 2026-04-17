import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Showreel } from "@/sections/Showreel";
import { Value } from "@/sections/Value";
import { Clients } from "@/sections/Clients";
import { Directions } from "@/sections/Directions";
import { Services } from "@/sections/Services";
import { Cases } from "@/sections/Cases";
import { Process } from "@/sections/Process";
import { Socials } from "@/sections/Socials";
import { Blog } from "@/sections/Blog";
import { CTA } from "@/sections/CTA";
import { Footer } from "@/sections/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showreel />
        <Clients />
        <Directions />
        <Value />
        <Cases />
        <Services />
        <Process />
        <Socials />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
