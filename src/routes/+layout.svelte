<script lang="ts">
	import Header from '@/components/Header.svelte';
	import Footer from '@/components/Footer.svelte';
	import '../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Header />
<main class="max-w-7xl flex-1 w-full">
	{@render children?.()}
</main>
<Footer />
