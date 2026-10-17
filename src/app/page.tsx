import { About } from "@/components/About";
import { AIShowcase } from "@/components/AIShowcase";
import { BlogPreview } from "@/components/BlogPreview";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { GitHubSection } from "@/components/GitHubSection";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { TerminalSection } from "@/components/TerminalSection";
import { LensProvider } from "@/components/ui";

export const revalidate = 21600; // GitHub data refreshes every 6 hours

export default function Home() {
  return (
    <LensProvider>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <AIShowcase />
        <Projects />
        <CaseStudies />
        <GitHubSection />
        <Credentials />
        <BlogPreview />
        <TerminalSection />
        <Contact />
      </main>
      <Footer />
    </LensProvider>
  );
}
