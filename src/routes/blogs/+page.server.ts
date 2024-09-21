import { getBlogs } from '@/lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { blogs: await getBlogs() };
};
