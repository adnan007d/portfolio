<script lang="ts">
	import SvelteSeo from '@/components/SvelteSeo.svelte';
	export let data;
</script>

<SvelteSeo title={data.metadata.title} description={data.metadata.description} />

<article class="mx-auto max-w-7xl py-5">
	<h1 class="text-4xl">{data.metadata.title}</h1>
	<p class="py-2">{data.metadata.description}</p>
	<span class="inline-block text-right w-full text-slate-200"> {data.metadata.date} </span>

	<div class="prose prose-invert max-w-full prose-code:none">
		<svelte:component this={data.content} />
	</div>
</article>
