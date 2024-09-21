<script lang="ts">
	import BlogCard from '@/components/BlogCard.svelte';
	export let data;
</script>

<svelte:head>
	<title>Blogs | Adnan Mansuri</title>
</svelte:head>

<section>
	<h1 class="text-4xl py-10 text-center">Blogs</h1>
	<ul class="grid md:grid-cols-2 xl:grid-cols-3 p-4">
		{#each data.blogs as blog}
			<BlogCard {blog} />
		{/each}
	</ul>
</section>
