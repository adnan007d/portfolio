import fs from "fs";
import path from "path";

async function getLatestSnippets() {
  const folderPath = `${process.cwd()}/src/snippets`;
  const files = await fs.promises
    .readdir(folderPath)
    .then((files) => files.filter((file) => file.endsWith(".mdx")));

  // TODO: Maybe a custom implementation for partial sort
  const sortedFiles = files
    .sort((a, b) => {
      const timeA = fs.statSync(`${path}/${a}`).mtime.getTime();
      const timeB = fs.statSync(`${path}/${b}`).mtime.getTime();
      return timeB - timeA;
    })
    .slice(0, 3);

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

const Snippets = async () => {
  const snippets = await getLatestSnippets();

  return (
    <div className="grid grid-cols-3">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="border border-white p-4">
          <p>{snippet.title}</p>
          <p>{snippet.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Snippets;
