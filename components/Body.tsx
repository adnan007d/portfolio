import React, { useState } from "react";
import About from "./About";
import Projects from "./Projects";

const Body = ({ className }: { className: string }) => {
  const [displayAbout, setDisplayAbout] = useState<boolean>(true);

  return (
    <div className={`${className}`}>
      <div className="flex justify-around mt-10">
        <div>
          <button
            className="btn bg-[#ffc09f]"
            onClick={(e) => setDisplayAbout(true)}
          >
            About
          </button>
        </div>
        <div>
          <button
            className="btn bg-[#ffee93]"
            onClick={(e) => setDisplayAbout(false)}
          >
            Projects
          </button>
        </div>
      </div>
      <main className="mt-10">
        {/* For SEO Beetch */}
        <About className={`${!displayAbout && "hidden"}`} />
        <Projects className={`${displayAbout && "hidden"}`} />
      </main>
    </div>
  );
};

export default Body;
