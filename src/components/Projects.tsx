import React from "react";

type Project = {
  name: string;
  link?: string;
  githubLink?: string;
  desc: string;
  techStack: string[];
};

function getAllProjects(): Project[] {
  return [
    {
      name: "Optiminastic",
      link: "https://optiminastic.com",
      techStack: ["Next.js", "Tailwind", "Node.js", "Express.js", "Golang"],
      desc: "Website with dashboard and backend also has a mail client written in go using google gmail api",
    },
    {
      name: "Real Good Chicken",
      link: "https://realgoodchicken.godrejagrovet.com",
      techStack: [
        "Next.js",
        "Tailwind",
        "Ant Design",
        "Vite",
        "Node.js",
        "Express.js",
        "NGINX",
        "Prisma",
        "MySQL",
      ],
      desc: "Website for Godrej brand of Real Good Chicken created using Next 13 React Server Components. A dashboard using vite and Ant Design. Backend using Express.js and MySQL as database",
    },
    {
      name: "World NFT Exchange",
      link: "https://worldnftexchange.io",
      techStack: [
        "Next.js",
        "Tailwind",
        "Solidity",
        "Ethers.js",
        "Wagmi",
        "Next-Auth",
        "Moralias",
        "Alchemy",
        "MongoDB",
      ],
      desc: "A NFT Trading platform built with Next.js and wagmi and ethers.js to commumincate between the smart contract and the web app",
    },
  ];
}

const Projects = async () => {
  const projects = getAllProjects();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-2 justify-center">
      {projects.map((project, i) => (
        <div
          key={i}
          className="border-white border-2 p-3 mx-3 rounded-lg max-w-[350px]"
        >
          <p className="text-xl font-bold text-secondary">{project.name}</p>
          <p className="text-sm text-slate-300">{project.desc}</p>
          <p className="text-lg font-bold text-secondary">Tech Stack</p>
          <div className="grid grid-cols-2 text-center text-[0.8em] gap-2 md:grid-cols-3">
            {project.techStack.map((stack, i) => (
              <span
                className="px-2 py-1 rounded-md bg-secondary font-bold"
                key={i}
              >
                {stack}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
