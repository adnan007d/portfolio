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
    <>
      <h3 className="text-4xl sm:text-5xl font-black text-center my-5 mb-10  mx-2">
        Professional Projects
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-2 justify-center">
        {projects.map((project, i) => (
          <div
            key={i}
            className="border-white/70 border-2 p-4 mx-3 rounded-lg max-w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-secondary">
                {project.name}
              </p>
              <a
                aria-label={`Link for ${project.name}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* NOTE: This svg will be added 2 times one for the actual html and one for the metadata to recreate the react tree */}
                <svg
                  className="w-7 aspect-square"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M15.7285 3.88396C17.1629 2.44407 19.2609 2.41383 20.4224 3.57981C21.586 4.74798 21.5547 6.85922 20.1194 8.30009L17.6956 10.7333C17.4033 11.0268 17.4042 11.5017 17.6976 11.794C17.9911 12.0863 18.466 12.0854 18.7583 11.7919L21.1821 9.35869C23.0934 7.43998 23.3334 4.37665 21.4851 2.5212C19.6346 0.663551 16.5781 0.905664 14.6658 2.82536L9.81817 7.69182C7.90688 9.61053 7.66692 12.6739 9.51519 14.5293C9.80751 14.8228 10.2824 14.8237 10.5758 14.5314C10.8693 14.2391 10.8702 13.7642 10.5779 13.4707C9.41425 12.3026 9.44559 10.1913 10.8809 8.75042L15.7285 3.88396Z"
                      fill="#a335fd"
                    />
                    <path
                      d="M14.4851 9.47074C14.1928 9.17728 13.7179 9.17636 13.4244 9.46868C13.131 9.76101 13.1301 10.2359 13.4224 10.5293C14.586 11.6975 14.5547 13.8087 13.1194 15.2496L8.27178 20.1161C6.83745 21.556 4.73937 21.5863 3.57791 20.4203C2.41424 19.2521 2.44559 17.1408 3.88089 15.6999L6.30473 13.2667C6.59706 12.9732 6.59614 12.4984 6.30268 12.206C6.00922 11.9137 5.53434 11.9146 5.24202 12.2081L2.81818 14.6413C0.906876 16.5601 0.666916 19.6234 2.51519 21.4789C4.36567 23.3365 7.42221 23.0944 9.33449 21.1747L14.1821 16.3082C16.0934 14.3895 16.3334 11.3262 14.4851 9.47074Z"
                      fill="#a335fd"
                    />
                  </g>
                </svg>
              </a>
            </div>
            <p className="text-sm text-slate-300">{project.desc}</p>
            <p className="text-xl font-bold text-secondary">Tech Stack</p>
            <div className="grid grid-cols-2 text-center text-[0.8em] gap-2 md:grid-cols-3">
              {project.techStack.map((stack, i) => (
                <span
                  className="px-2 py-1 rounded-md text-white bg-secondary font-bold"
                  key={i}
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;
