export type Type = 'blog' | 'snippet';

export type Blog = {
	title: string;
	slug: string;
	description: string;
	date: string;
	published: boolean;
	type: string[];
	tags: string[];
};

export type Repo = {
	name: string;
	html_url: string;
	forks: number;
	stargazers_count: number;
	description: string;
};
