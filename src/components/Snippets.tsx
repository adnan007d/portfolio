import Link from "next/link";
import React from "react";
import path from "path";
import fs from "fs";

type ISnippet = any;
type GetSnippets = {
  latest: boolean;
};

export async function getSnippets(options?: GetSnippets) {
  const folderPath = `${process.cwd()}/src/snippets`;
  const files = await fs.promises
    .readdir(folderPath)
    .then((files) => files.filter((file) => file.endsWith(".mdx")));

  // TODO: Maybe a custom implementation for partial sort
  let sortedFiles = files.sort((a, b) => {
    const timeA = fs.statSync(`${path}/${a}`).mtime.getTime();
    const timeB = fs.statSync(`${path}/${b}`).mtime.getTime();
    return timeB - timeA;
  });

  if (options?.latest) {
    sortedFiles = sortedFiles.slice(0, 3);
  }

  const data = await Promise.all(
    sortedFiles.map(async (file) => {
      const meta = await import(`@/snippets/${file}`).then((mod) => mod.meta);
      return {
        id: path.parse(file).name,
        ...meta,
      };
    })
  );

  return data;
}

export const Snippet = ({ snippet }: { snippet: ISnippet }) => {
  return (
    <div
      key={snippet.id}
      className="grid border border-white p-4 gap-3 rounded-md"
    >
      <p className="text-secondary text-xl font-bold">{snippet.title}</p>
      <p className="text-sm">{snippet.desc}</p>
      <Link
        className="bg-secondary px-4 py-2 w-max justify-self-end font-medium rounded-md"
        href={`/snippets/${snippet.id}`}
      >
        View
      </Link>
    </div>
  );
};

const Snippets = async () => {
  const snippets = await getSnippets({ latest: true });
  return (
    <>
      <h4 className="text-4xl sm:text-5xl font-black text-center my-5 mx-2">
        Snippets
      </h4>
      <div className="grid gap-5 mx-2 md:grid-cols-2 lg:grid-cols-3">
        {snippets.map((snippet) => (
          <Snippet key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </>
  );
};

export default Snippets;
