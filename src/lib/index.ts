// place files you want to import through the `$lib` alias in this folder.
import type { Blog } from '$lib/types';

export async function getBlogs() {
	const blogs: Blog[] = [];

	const paths = import.meta.glob('/src/blogs/*.md', { eager: true });

	for (const path in paths) {
		const file = await paths[path];
		const slug = path.split('/').pop()?.replace(/\.md$/, '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const blog = file.metadata as Blog;
			blog.slug = slug;

			if (blog.published || import.meta.env.DEV) blogs.push(blog);
		}

		blogs.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
	}

	return blogs;
}
