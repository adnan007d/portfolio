import fs from "fs";

async function getLatestSnippets() {
  const path = `${process.cwd()}/src/snippets`;
  const files = await fs.promises
    .readdir(path)
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
    sortedFiles.map((file) =>
      import(`@/snippets/${file}`).then((mod) => mod.meta)
    )
  );

  return data;
}

const Snippets = async () => {
  const snippets = await getLatestSnippets();

  return (
    <div className="grid grid-cols-3">
      {snippets.map((snippet, i) => (
        <div key={i}>
          <p>{snippet.title}</p>
          <p>{snippet.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Snippets;
