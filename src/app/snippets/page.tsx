import { Snippet, getSnippets } from "@/components/Snippets";

const Snippets = async () => {
  const snippets = await getSnippets();

  return (
    <div className="grid gap-5 mx-2 md:grid-cols-2 lg:grid-cols-3">
      {snippets.map((snippet) => (
        <Snippet key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
};

export default Snippets;
