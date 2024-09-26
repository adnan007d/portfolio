<script lang="ts">
	export let baseUrl = 'https://www.adnan007d.dev';
	export let title: string;
	export let description: string;
	export let path: string;
	export let image = 'https://www.adnan007d.dev/og-image.jpg';
	export let imagePath: string | null = null;
	export let imageWidth = 1200;
	export let imageHeight = 600;
	export let squareImagePath: string | null = null;
	export let squareImage = 'https://www.adnan007d.dev/og-image.jpg';
	export let squareImageWidth = 1200;
	export let squareImageHeight = 1200;

	squareImage = squareImagePath ? `${baseUrl}${squareImagePath}` : squareImage;
	image = imagePath ? `${baseUrl}${imagePath}` : image;
	let url = `${baseUrl}${path}`;
</script>

<svelte:head>
	<title>
		{title}
	</title>
	<meta property="og:title" content={description} />
	<meta name="description" content={description} />
	<meta name="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content="adnan007d" />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content={`${imageWidth}`} />
	<meta property="og:image:height" content={`${imageHeight}`} />
	<meta property="og:image" content={squareImage} />
	<meta property="og:image:width" content={`${squareImageWidth}`} />
	<meta property="og:image:height" content={`${squareImageHeight}`} />
	<meta property="og:image:alt" content="og image" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@adnan007d" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content="og image" />
	<link rel="canonical" href={url} />
	<meta name="author" content="Adnan Mansuri" />
</svelte:head>
