<script lang="ts">
	import SvelteSeo from '@/components/SvelteSeo.svelte';
	let { data } = $props();
</script>

<SvelteSeo
	title={data.metadata.title}
	description={data.metadata.description}
	path={`/blogs/${data.metadata.slug}`}
	imagePath={`/api/og?slug=${data.metadata.slug}`}
	squareImagePath={`/api/og?slug=${data.metadata.slug}&type=square`}
/>

<article class="mx-auto py-5 px-2 max-w-[95vw] sm:max-w-7xl sm:px-6">
	<h1 class="text-[min(11vw,2.25rem)] sm:text-4xl">{data.metadata.title}</h1>
	<p class="py-2">{data.metadata.description}</p>
	<span class="italic text-sm inline-block text-right w-full text-slate-200">
		{data.metadata.date}
	</span>

	<div class="prose prose-invert max-w-full prose-code:none py-10">
		<data.content />
	</div>
</article>
