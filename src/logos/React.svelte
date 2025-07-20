<script lang="ts">
	let { size = 72, className = '' } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="-10.5 -9.45 21 18.9"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
>
	<circle cx="0" cy="0" r="2" fill="#A335FD" />
	<g stroke="#A335FD" stroke-width="1" fill="none">
		<ellipse rx="10" ry="4.5" />
		<ellipse rx="10" ry="4.5" transform="rotate(60)" />
		<ellipse rx="10" ry="4.5" transform="rotate(120)" />
	</g>
</svg>
