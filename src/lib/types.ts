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
