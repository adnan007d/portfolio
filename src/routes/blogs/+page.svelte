<script lang="ts">
	import BlogCard from '@/components/BlogCard.svelte';
	import SvelteSeo from '@/components/SvelteSeo.svelte';
	export let data;
</script>

<SvelteSeo
	title="Blogs | Adnan Mansuri"
	description="My blogs on various topics like software development, programming, and technology"
/>

<section>
	<h1 class="text-4xl py-10 text-center">Blogs</h1>
	<ul class="grid gap-5 md:grid-cols-2 xl:grid-cols-3 p-4">
		{#each data.blogs as blog}
			<BlogCard {blog} />
		{/each}
	</ul>
</section>
