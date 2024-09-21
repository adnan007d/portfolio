<script lang="ts">
	import type { Blog } from '$lib/types';

	export let blog: Blog;
</script>

<li class="bg-gray-800 border border-secondary max-w-[95vw] w-96">
	<div class="p-6">
		<p class="text-2xl font-semibold text-secondary mb-2">{blog.title}</p>
		<div class="text-right text-gray-400 mb-4">
			<span>{blog.date}</span>
		</div>
		<p class="text-gray-300 mb-4" title={blog.description}>{blog.description}</p>
		<a
			class="text-secondary font-bold flex rounded-md ml-auto w-max bg-white p-2"
			href={`blogs/${blog.slug}`}
		>
			Read More
      <span class="sr-only"> about ${blog.title} </span>
		</a>
	</div>
</li>
