<script>
	import Header from '@/components/Header.svelte';
	import Footer from '@/components/Footer.svelte';
	import SvelteSeo from '@/components/SvelteSeo.svelte';
	import '../app.css';
</script>

<SvelteSeo
	title="Adnan Mansuri"
	description="Experienced Software Developer with expertise in TypeScript, Node.js, Next.js, data structures, and algorithms. "
/>
<Header />
<main class="max-w-7xl flex-1">
	<slot />
</main>
<Footer />
