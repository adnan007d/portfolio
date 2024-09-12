import type { PageLoad } from './$types';
type Repo = {
	name: string;
	url: string;
	forks: string;
	stars: string;
	description: string;
};

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://api.github.com/users/adnan007d/repos?sort=pushed&per_page=3');

	const data: Repo[] = [];

	if (res.ok) {
		const repos = await res.json();
		data.push(
			...repos.map(
				(repo: {
					name: string;
					html_url: string;
					forks: number;
					stargazers_count: number;
					description: string;
				}) => ({
					name: repo.name,
					url: repo.html_url,
					forks: repo.forks,
					stars: repo.stargazers_count,
					description: repo.description
				})
			)
		);
	} else {
		console.error(await res.json());
	}
	return { repos: data };
};
