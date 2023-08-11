import React from "react";
import fs from "fs";
import path from "path";
import Highlight from "./Highlight";

export async function generateStaticParams() {
  const folderPath = process.cwd() + "/src/snippets";
  const files = await fs.promises
    .readdir(folderPath)
    .then((files) => files.filter((file) => file.endsWith(".mdx")));

  return files.map((file) => ({
    id: path.parse(file).name,
  }));
}

export const dynamicParams = false;

const Snippet = async ({ params }: { params: { id: string } }) => {
  const MDX = await import(`@/snippets/${params.id}.mdx`).then(
    (mod) => mod.default
  );
  return (
    <div className="prose prose-invert prose-pre:bg-inherit">
      <MDX />
      <Highlight />
      <div>Snippet {params.id}</div>
    </div>
  );
};

export default Snippet;
