import About from "@/components/About";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div>
      <Banner />
      <section className="lg:grid lg:gap-5 lg:grid-cols-2 text-center mx-auto max-w-[90vw]">
        <About />
      </section>
    </div>
  );
}
