import type { PageLoad } from './$types';
import { getGitRepos } from '$lib';

export const load: PageLoad = async ({ data }) => {
	return {
		blogs: data.blogs,
		repos: getGitRepos()
	};
};
