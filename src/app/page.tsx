import About from "@/components/About";
import Banner from "@/components/Banner";
import dynamic from "next/dynamic";

const TechStack = dynamic(() => import("@/components/TechStack"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Banner />
      <section className="grid gap-5 lg:grid-cols-2">
        <TechStack />
        <About />
      </section>
    </div>
  );
}
