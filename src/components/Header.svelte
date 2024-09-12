<script>
	import ProfileImage from '$lib/assets/profile_72x72.webp';
</script>

<header class="flex justify-between items-center p-4 max-w-7xl mx-auto">
	<img class="rounded-full" src={ProfileImage} alt="Profile" width={48} height={48} />
	<button
		aria-label="Theme Toggle"
		on:click={() => {
			window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
		}}
		class="cursor-pointer"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="36"
			height="36"
			fill="none"
			stroke="white"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="5"></circle>
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</svg>
	</button>
</header>
