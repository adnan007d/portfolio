import React from "react";

/**
 * @throws FetchError
 */
async function getLatestGitRepos(): Promise<any[]> {
  const data = await fetch(
    "https://api.github.com/users/adnan007d/repos?sort=created&per_page=3",
    { next: { revalidate: 60 } }
  ).then((res) => res.json());

  return data;
}

const LatestGitRepo = async () => {
  const repos = await getLatestGitRepos();

  return (
    <div>
      {repos.map((repo) => (
        <span key={repo.id}>{repo.name} </span>
      ))}
    </div>
  );
};

export default LatestGitRepo;
