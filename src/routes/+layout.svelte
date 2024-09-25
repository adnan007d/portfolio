<script>
	import Header from '@/components/Header.svelte';
	import Footer from '@/components/Footer.svelte';
	import '../app.css';
</script>

<Header />
<main class="max-w-7xl flex-1 w-full">
	<slot />
</main>
<Footer />
