"use client";

import "highlight.js/styles/base16/dracula.css";
import hljs from "highlight.js/lib/core";
import { useEffect } from "react";
import json from "highlight.js/lib/languages/json";

const Highlight = () => {
  const languages = [{ name: "json", languageFn: json }];
  languages.forEach((language) =>
    hljs.registerLanguage(language.name, language.languageFn)
  );
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return null;
};

export default Highlight;
