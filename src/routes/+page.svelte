<script lang="ts">
	import JobExperience from '@/components/JobExperience.svelte';
	import type { PageData } from './$types';
	import StarIcon from '@/logos/StarIcon.svelte';
	import GitFork from '@/logos/GitFork.svelte';
	import GithubOutline from '@/logos/GithubOutline.svelte';
	import BlogCard from '@/components/BlogCard.svelte';
	export let data: PageData;

	const stacks = [
		{ name: 'Node.js', image: '/logos/nodejs.svg' },
		{ name: 'Typescript', image: '/logos/typescript.svg' },
		{ name: 'Next.js', image: '/logos/nextjs.svg' },
		{ name: 'React.js', image: '/logos/react.svg' },
		{ name: 'SQL', image: '/logos/sql.svg' },
		{ name: 'Python', image: '/logos/python.svg' },
		{ name: 'C++', image: '/logos/cpp.svg' },
		{ name: 'Golang', image: '/logos/golang.svg' },
		{ name: 'Git', image: '/logos/git.svg' },
		{ name: 'Linux', image: '/logos/linux.svg' },
		{ name: 'MongoDB', image: '/logos/mongo.svg' },
		{ name: 'Neovim', image: '/logos/nvim.svg' },
		{ name: 'Tailwind', image: '/logos/tailwindcss.svg' }
	];
</script>

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
		Software Developer with 5 Years of programming experince. I like working on backend and software
		development and learning about new technologies
		<br />
		I have worked with various programming languages and frameworks namely TypeScript, JavaScript, Node.js,
		Express.js, Next.js, React.js, Golang, Python, C/C++
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
	{#each stacks as stack}
		<div data-stack-name={stack.name} class="arsenal-icon">
			<img
				src={stack.image}
				alt={`${stack.name} logo`}
				width={72}
				height={72}
				class="object-fit w-[72px] aspect-square"
			/>
		</div>
	{/each}
</div>

<JobExperience />

<section class="py-16 px-4 sm:px-6 lg:px-8">
	<h2 class="text-3xl font-bold text-center mb-12">Latest GitHub Repositories</h2>
	<div class="flex gap-8 flex-wrap justify-center">
		{#each data.repos as repo}
			<div class="flex flex-col bg-gray-800 border border-secondary w-full p-6 sm:w-96">
				<h3 class="text-2xl font-semibold text-secondary mb-2">{repo.name}</h3>
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
	</div>
</section>

<section class="py-16 px-4 sm:px-6 lg:px-8">
	<h3 class="text-3xl font-bold text-center mb-12">Latest Blogs</h3>
	<a href="/blogs" class="text-secondary text-right inline-block w-full mb-4">View All Blogs</a>
	<ul class="flex flex-wrap">
		{#each data.blogs as blog}
			<BlogCard {blog} />
		{/each}
	</ul>
</section>
