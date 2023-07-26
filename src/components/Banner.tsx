import clsx from "clsx";


const Banner = () => {
  return (
    <section className="my-[5vh] min-h-[50vh] grid place-items-center">
      <h1
        className={clsx(
          "text-[10vw] text-center self-end",
          "sm:text-5xl",
          "md:text-7xl",
          "lg:text-8xl",
          "xl:text-9xl"
        )}
      >
        Adnan Mansuri
      </h1>
      <h2
        className={clsx(
          "text-xl text-center self-start font-black animate-shine",
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
