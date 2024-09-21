<script lang="ts">
	import type { Blog } from '$lib/types';

	export let blog: Blog;
</script>

<li class="bg-gray-800 border border-secondary max-w-[95vw] w-96">
	<div class="p-6">
		<h3 class="text-2xl font-semibold text-secondary mb-2">{blog.title}</h3>
		<div class="text-right text-gray-500 mb-4">
			<span>{blog.date}</span>
		</div>
		<p class="text-gray-300 mb-4">{blog.description}</p>
		<a class="text-secondary inline-block w-full text-right" href={`blogs/${blog.slug}`}>
			Read More
		</a>
	</div>
</li>
