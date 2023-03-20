"use client";
import { Pack, hierarchy } from "@visx/hierarchy";
import { ParentSize } from "@visx/responsive";
import clsx from "clsx";
import { useMemo } from "react";

const TECH_STACK = [
  {
    name: "Node.js",
    weight: 10,
    imageUrl: "https://nodejs.org/static/images/logo.svg",
    link: "https://nodejs.org/",
  },
  {
    name: "Next.js",
    weight: 10,
    imageUrl: "https://nextjs.org/static/favicon/favicon-32x32.png",
    link: "https://nextjs.org/",
  },
  {
    name: "TypeScript",
    weight: 10,
    imageUrl: "https://www.typescriptlang.org/favicon-32x32.png",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "React.js",
    weight: 9,
    imageUrl: "https://reactjs.org/favicon-32x32.png",
    link: "https://reactjs.org/",
  },
  {
    name: "C++",
    weight: 5,
    imageUrl: "https://isocpp.org/assets/images/cpp_logo.png",
    link: "https://isocpp.org/",
  },
  {
    name: "Python",
    weight: 5,
    imageUrl: "https://www.python.org/static/opengraph-icon-200x200.png",
    link: "https://www.python.org/",
  },
  {
    name: "MongoDB",
    weight: 10,
    imageUrl: "https://www.mongodb.com/assets/images/global/favicon.ico",
    link: "https://www.mongodb.com/",
  },
  {
    name: "Firebase",
    weight: 10,
    imageUrl:
      "https://firebase.google.com/images/brand-guidelines/logo-standard.png",
    link: "https://firebase.google.com/",
  },
  {
    name: "MySQL",
    weight: 5,
    imageUrl: "https://www.mysql.com/common/logos/logo-mysql-170x115.png",
    link: "https://www.mysql.com/",
  },
  {
    name: "Git",
    weight: 4,
    imageUrl: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
    link: "https://git-scm.com/",
  },
  {
    name: "Qt",
    weight: 5,
    imageUrl: "https://www.qt.io/qt-static/press-kit/logos/qt-logo.png",
    link: "https://www.qt.io/",
  },
  {
    name: "Tailwind CSS",
    weight: 10,
    imageUrl: "https://tailwindcss.com/favicon-32x32.png",
    link: "https://tailwindcss.com/",
  },
  {
    name: "JAVA",
    weight: 5,
    imageUrl: "https://www.java.com/favicon.ico",
    link: "https://www.java.com/",
  },
  {
    name: "Linux",
    weight: 5,
    imageUrl: "https://www.linux.org/favicon.ico",
    link: "https://www.linux.org/",
  },
  {
    name: "Express",
    weight: 10,
    imageUrl: "https://expressjs.com/images/favicon.png",
    link: "https://expressjs.com/",
  },
];
const pack = {
  children: TECH_STACK,
  name: "root",
  radius: 0,
  distance: 0,
};

const TechStack = () => {
  const root = useMemo(
    () =>
      hierarchy(pack)
        .sum((d) => d?.weight, 1)
        .sort((a, b) => (b.data.weight ?? 0) - (a.data.weight ?? 0)),
    []
  );

  return (
    <ParentSize>
      {({ width = 800 }) => {
        return width < 10 ? null : (
          <div
            style={{
              width,
              height: width,
              position: "relative",
            }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
            .spon-link {
              transition: all .2s ease;
              transform: translate(-50%, -50%);
            }
            .spon-link:hover {
              z-index: 10;
              transform: translate(-50%, -50%) scale(1.1);
            }
            .spon-link:hover .spon-tooltip {
              opacity: 1;
            }
          `,
              }}
            />
            <Pack root={root} size={[width, width]} padding={width * 0.005}>
              {(packData) => {
                const circles = packData.descendants().slice(1); // skip first layer
                return (
                  <div>
                    {[...circles].reverse().map((circle, i) => {
                      const tooltipX = circle.x > width / 2 ? "left" : "right";
                      const tooltipY = circle.y > width / 2 ? "top" : "bottom";

                      return (
                        <a
                          key={`circle-${i}`}
                          href={circle.data.link}
                          className={
                            `spon-link ` +
                            `absolute shadow-lg bg-white rounded-full z-0`
                          }
                          style={{
                            left: circle.x,
                            top: circle.y,
                            width: circle.r * 2,
                            height: circle.r * 2,
                          }}
                        >
                          <div
                            key={`circle-${i}`}
                            className={`absolute bg-no-repeat bg-center bg-contain rounded-full
                                  w-[95%] h-[95%] dark:w-[100.5%] dark:h-[100.5%]
                                  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                  `}
                            style={{
                              backgroundImage: `url(${circle.data.imageUrl})`,
                            }}
                          />
                          <div
                            className={clsx(
                              `spon-tooltip absolute text-sm
                            bg-gray-800 text-white p-2 pointer-events-none
                            transform opacity-0
                            shadow-xl rounded-lg
                            flex flex-col items-center
                          `,

                              tooltipX == "left"
                                ? `left-1/4 -translate-x-full`
                                : `right-1/4 translate-x-full`,
                              tooltipY == "top"
                                ? `top-1/4 -translate-y-full`
                                : `bottom-1/4 translate-y-full`
                            )}
                          >
                            <p className={`whitespace-nowrap font-bold`}>
                              {circle.data.name}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                );
              }}
            </Pack>
          </div>
        );
      }}
    </ParentSize>
  );
};

export default TechStack;
