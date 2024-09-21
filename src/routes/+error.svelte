<script>
	import { page } from '$app/stores';
</script>

<div class="text-center mt-[30dvh]">
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>
