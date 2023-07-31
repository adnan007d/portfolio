import { cn } from "@/lib/utils";

const Banner = () => {
  return (
    <section className="my-[5vh] min-h-[50vh] grid place-items-center">
      <h1
        className={cn(
          "text-[10vw] text-center self-end uppercase font-black",
          "sm:text-5xl",
          "md:text-7xl",
          "lg:text-8xl",
          "xl:text-9xl"
        )}
      >
        Adnan Mansuri
      </h1>
      <h2
        className={cn(
          "text-center text-secondary self-start font-semibold animate-shine text-[6vw]",
          "sm:text-3xl",
          "md:text-4xl"
        )}
      >
        Software Developer
      </h2>
    </section>
  );
};

export default Banner;
