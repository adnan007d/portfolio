"use client";

import localFont from "next/font/local";
import clsx from "clsx";
import { motion } from "framer-motion";
const led = localFont({
  src: "../../public/fonts/LED Dot-Matrix.woff2",
  variable: "--font-led",
  display: "swap",
});

const string = `Adnan Mansuri`;

const BannerName = () => {
  return (
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
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.5,
              rotate: 180,
              skewX: 12,
              skewY: 12,
              translateX: 69,
              translateY: 69,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              skewX: 0,
              skewY: 0,
              translateX: 0,
              translateY: 0,
            }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={clsx(
              "relative",
              char !== " " && "inline-block",
              "hover:text-shadow"
            )}
          >
            {char}
          </motion.span>
        );
      })}
    </h1>
  );
};

export default BannerName;
