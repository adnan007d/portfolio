<script lang="ts">
	import JobExperience from '@/components/JobExperience.svelte';
	import type { PageData } from './$types';
	import StarIcon from '@/logos/StarIcon.svelte';
	import GitFork from '@/logos/GitFork.svelte';
	import GithubOutline from '@/logos/GithubOutline.svelte';
	import BlogCard from '@/components/BlogCard.svelte';
	import SvelteSeo from '@/components/SvelteSeo.svelte';
	import Nodejs from '@/logos/Nodejs.svelte';
	import Typescript from '@/logos/Typescript.svelte';
	import Nextjs from '@/logos/Nextjs.svelte';
	import React from '@/logos/React.svelte';
	import SQL from '@/logos/SQL.svelte';
	import Python from '@/logos/Python.svelte';
	import Cpp from '@/logos/Cpp.svelte';
	import Golang from '@/logos/Golang.svelte';
	import Git from '@/logos/Git.svelte';
	import Linux from '@/logos/Linux.svelte';
	import Mongo from '@/logos/Mongo.svelte';
	import Nvim from '@/logos/Nvim.svelte';
	import Tailwind from '@/logos/Tailwind.svelte';
	import Angular from '@/logos/Angular.svelte';
	import Dotnet from '@/logos/Dotnet.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const stacks = [
		{ name: 'Node.js', component: Nodejs },
		{ name: 'Typescript', component: Typescript },
		{ name: 'Next.js', component: Nextjs },
		{ name: 'React.js', component: React },
		{ name: 'SQL', component: SQL },
		{ name: 'Python', component: Python },
		{ name: 'C++', component: Cpp },
		{ name: 'Golang', component: Golang },
		{ name: 'Git', component: Git },
		{ name: 'Linux', component: Linux },
		{ name: 'MongoDB', component: Mongo },
		{ name: 'Neovim', component: Nvim },
		{ name: 'Tailwind', component: Tailwind },
		{ name: 'Angular', component: Angular },
		{ name: '.NET', component: Dotnet }
	];
</script>

<SvelteSeo
	title="Adnan Mansuri"
	description="Experienced Software Developer with expertise in TypeScript, Node.js, Next.js, data structures, and algorithms. "
	path="/"
/>
<section class="my-[5vh] min-h-[50vh] grid place-items-center">
	<p
		class="text-[10vw] text-center self-end uppercase font-extrabold sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl"
	>
		Adnan Mansuri
	</p>
	<p class="text-center text-secondary self-start font-semibold text-[6vw] sm:text-3xl md:text-4xl">
		Software Developer
	</p>
</section>

<section class="px-4 py-12">
	<p class="text-4xl sm:text-5xl font-black text-center my-5 mb-10">About</p>
	<h1 class="text-slate-200 font-bold text-lg px-4">
		Software Developer with 6 years of programming experience and 2 years of professional
		experience. I like working on backend and software development and learning about new
		technologies
		<br />
		I have worked with various programming languages and frameworks namely TypeScript, JavaScript, Node.js,
		Express.js, Next.js, React.js, Angular, Dotnet, Golang, Python, C/C++
		<br />
		Capable of adapting quickly to any framework/language efficiently
	</h1>
</section>
<p class="text-4xl sm:text-5xl font-black text-center my-5 mb-10" aria-label="Tech Stack">
	Arsenal
</p>
<div
	class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8 mb-10"
>
	{#each stacks as stack (stack.name)}
		<div data-stack-name={stack.name} class="arsenal-icon">
			<stack.component size={72} className="object-fit w-[72px] aspect-square" />
		</div>
	{/each}
</div>

<section class="py-16 px-4 sm:px-6 lg:px-8">
	<h2 class="text-3xl font-bold text-center mb-12">Latest Blogs</h2>
	<a href="/blogs" class="text-secondary rounded-md font-bold bg-white flex w-max p-2 ml-auto mb-4"
		>View All Blogs</a
	>
	<ul class="flex flex-wrap gap-5">
		{#each data.blogs as blog (blog.slug)}
			<BlogCard {blog} />
		{/each}
	</ul>
</section>
<JobExperience />

<section class="py-16 px-4 sm:px-6 lg:px-8">
	<h3 class="text-3xl font-bold text-center mb-12">Latest GitHub Repositories</h3>
	<div class="flex gap-8 flex-wrap justify-center">
		{#await data.repos}
			<div class="flex flex-col bg-gray-800 border border-secondary w-full p-6 sm:w-96">
				<p class="text-2xl font-semibold text-secondary mb-2">Loading...</p>
			</div>
		{:then repos}
			{#each repos as repo (repo.name)}
				<div class="flex flex-col bg-gray-800 border border-secondary w-full p-6 sm:w-96">
					<p class="text-2xl font-semibold text-secondary mb-2">{repo.name}</p>
					<p class="text-gray-300 flex-1 mb-4 line-clamp-3" title={repo.description}>
						{repo.description}
					</p>
					<div class="flex justify-between items-center">
						<div class="flex space-x-4">
							<span class="flex gap-2 items-center text-gray-400">
								<StarIcon />
								{repo.stargazers_count}
							</span>
							<span class="flex gap-2 items-center text-gray-400">
								<GitFork />
								{repo.forks}
							</span>
						</div>
						<a
							href={repo.html_url}
							target="_blank"
							class="text-secondary cursor-pointer transition-all duration-150 bg-white flex gap-2 rounded-md p-2 border border-secondary hover:bg-secondary hover:text-gray-900"
						>
							<GithubOutline />
							View
						</a>
					</div>
				</div>
			{/each}
		{/await}
	</div>
</section>
