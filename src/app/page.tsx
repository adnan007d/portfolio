import About from "@/components/About";
import Banner from "@/components/Banner";
import TicTacToe from "@/components/TicTacToe";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div>
      <Toaster />
      <Banner />
      <section className="grid gap-5 lg:grid-cols-2 text-center mx-auto max-w-[90vw]">
        <About />
        <TicTacToe />
      </section>
    </div>
  );
}
