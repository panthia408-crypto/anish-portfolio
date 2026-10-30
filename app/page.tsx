import About from "./components/home/About";
import Contact from "./components/home/Contact";
import Hero from "./components/home/Hero";
import Research from "./components/home/Research";
import Work from "./components/home/Work";
import Writing from "./components/home/Writing";
import "./styles/home.css";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />

      <Research />

      <Work />

      <About />

      <Writing />

      <Contact />
    </main>
  );
}
