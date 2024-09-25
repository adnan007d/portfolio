import type { PageServerLoad } from './$types';
import { getBlogs } from '$lib';

type Repo = {
	name: string;
	html_url: string;
	forks: number;
	stargazers_count: number;
	description: string;
};

function getGitRepos(fetchx: typeof fetch) {
	return new Promise<Repo[]>((resolve, reject) =>
		fetchx('https://api.github.com/users/adnan007d/repos?sort=pushed&per_page=3')
			.then((res) => (res.ok ? resolve(res.json()) : reject()))
			.catch(reject)
	);
}
export const load: PageServerLoad = async () => {
	return {
		blogs: await getBlogs().then((blogs) => blogs.slice(0, 3)),
		repos: await getGitRepos(fetch)
	};
};
