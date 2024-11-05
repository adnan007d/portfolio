import type { PageServerLoad } from './$types';
import { getBlogs } from '$lib';

export const load: PageServerLoad = async () => {
	return {
		blogs: await getBlogs().then((blogs) => blogs.slice(0, 3))
	};
};
