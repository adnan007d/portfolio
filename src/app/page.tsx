import About from "@/components/About";
import Banner from "@/components/Banner";
import TicTacToe from "@/components/TicTacToe";
import { Toaster } from "@/components/ui/toaster";
import Arsenal from "@/components/Arsenal";
import Projects from "@/components/Projects";
import LatestGitRepo from "@/components/LatestGitRepo";
import Snippets from "@/components/Snippets";

// One day
export const revalidate = 86400;

export default function Home() {
  return (
    <div>
      <Toaster />
      <Banner />
      <section className="grid gap-5 lg:grid-cols-2 text-center mx-auto max-w-[90vw]">
        <About />
        <TicTacToe />
      </section>
      <Arsenal />
      <Projects />
      <LatestGitRepo />
      <Snippets />
    </div>
  );
}
