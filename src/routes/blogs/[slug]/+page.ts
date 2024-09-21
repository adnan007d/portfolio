import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Blog } from '@/lib/types';

export const load: PageLoad = async ({ params }) => {
	try {
		const blog = await import(`@/blogs/${params.slug}.md`);
		return {
			content: blog.default,
			metadata: blog.metadata as Omit<Blog, 'slug'>
		};
	} catch (e) {
		console.error(e);
		return error(404, `"${params.slug}" Blog not found`);
	}
};
