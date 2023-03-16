import localFont from "next/font/local";
import clsx from "clsx";
const led = localFont({
  src: "../../public/fonts/LED Dot-Matrix.woff2",
  variable: "--font-led",
  display: "swap",
});

const string = `FUCK YOU`;

const Banner = () => {
  return (
    <>
      <h1
        className={clsx(
          led.className,
          "text-3xl text-center",
          "sm:text-5xl",
          "md:text-7xl",
          "lg:text-8xl",
          "xl:text-9xl"
        )}
      >
        {string.split("").map((char, index) => {
          return (
            <span
              key={index}
              className={clsx(
                "relative",
                char !== " " && "inline-block",
                "text-shadow"
              )}
            >
              {char}
            </span>
          );
        })}
      </h1>
      <h2
        className={clsx(
          led.className,
          "text-xl text-center",
          "sm:text-3xl",
          "md:text-5xl",
          "font-black",
          "animate-shine"
        )}
      >
        Backend Developer
      </h2>
    </>
  );
};

export default Banner;
