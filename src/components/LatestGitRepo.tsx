import Image from "next/image";
import React from "react";

/**
 * @throws FetchError
 */
async function getOgImageFromGithub(url: string): Promise<string | undefined> {
  console.log(url);

  const html = await fetch(url, { next: { revalidate: 60 * 60 * 24 } }).then(
    (res) => res.text()
  );

  const match = html.match(/property="og:image" content="([^"]*)" \/>/);
  return match?.[1];
}

/**
 * @throws FetchError
 */
async function getLatestGitRepos(): Promise<any[]> {
  const repos = await fetch(
    "https://api.github.com/users/adnan007d/repos?sort=created&per_page=3",
    { next: { revalidate: 60 * 60 * 24 } }
  ).then((res) => res.json());

  const data = await Promise.all(
    repos.map(async (repo: any) => ({
      ...repo,
      ogImage: await getOgImageFromGithub(repo.html_url),
    }))
  );

  return data;
}

const LatestGitRepo = async () => {
  const repos = await getLatestGitRepos();

  return (
    <div className="my-10">
      <h4 className="text-4xl sm:text-5xl font-black text-center my-5 mx-2">
        Latest Github Repositories
      </h4>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
        {repos.map((repo) => (
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[350px] mx-3 max-w-[90vw] border-2 rounded-lg overflow-hidden border-secondary"
            key={repo.id}
          >
            <Image
              src={repo.ogImage}
              width={1200}
              height={600}
              alt={`OG Image from ${repo.name}`}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LatestGitRepo;
