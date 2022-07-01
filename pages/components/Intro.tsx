import React, { useState } from "react";

const age =
  new Date(Date.now() - new Date(2001, 9, 17).getTime()).getFullYear() - 1970;
const _ageText = age + " years old";

const Intro = () => {
  const [ageText, setAgeText] = useState<string>(_ageText);
  return (
    <div className="text-2xl sm:text-4xl font-bold text-center mb-5 text-[#d3499e]">
      <h3>
        Hello, I am{" "}
        <span
          className="text-gray-400 cursor-pointer"
          onMouseEnter={() => setAgeText("Calculated using JS")}
          onMouseLeave={() => setAgeText(_ageText)}
        >
          {ageText}
        </span>
      </h3>
      <p>I Like Making Stuff</p>
    </div>
  );
};

export default Intro;
