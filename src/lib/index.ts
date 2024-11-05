// place files you want to import through the `$lib` alias in this folder.
import type { Blog, Repo } from '$lib/types';

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

export function getGitRepos() {
	return new Promise<Repo[]>((resolve, reject) =>
		fetch('https://api.github.com/users/adnan007d/repos?sort=pushed&per_page=3')
			.then((res) => (res.ok ? resolve(res.json()) : reject()))
			.catch(reject)
	);
}
