import React from "react";
import fs from "fs";
import path from "path";
import Highlight from "./Highlight";
import type { Metadata } from "next";
import type { MDXMetaData } from "@/types/mdx";

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

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const metadata: MDXMetaData = await import(
    `@/snippets/${params.id}.mdx`
  ).then((mod) => mod.meta);

  return {
    title: metadata.title,
    description: metadata.desc,
    openGraph: {
      title: metadata.title,
      description: metadata.desc,
    },
  };
}

const Snippet = async ({ params }: { params: { id: string } }) => {
  const MDX = await import(`@/snippets/${params.id}.mdx`).then(
    (mod) => mod.default
  );
  return (
    <div className="prose prose-invert prose-pre:bg-inherit mx-[5vw] max-w-3xl">
      <MDX />
      <Highlight />
    </div>
  );
};

export default Snippet;
