<script lang="ts">
	interface Props {
		baseUrl?: string;
		title: string;
		description: string;
		path: string;
		image?: string;
		imagePath?: string | null;
		imageWidth?: number;
		imageHeight?: number;
		squareImagePath?: string | null;
		squareImage?: string;
		squareImageWidth?: number;
		squareImageHeight?: number;
	}

	let {
		baseUrl = 'https://www.adnan007d.dev',
		title,
		description,
		path,
		image: _image = 'https://www.adnan007d.dev/og-image.jpg',
		imagePath = null,
		imageWidth = 1200,
		imageHeight = 600,
		squareImagePath = null,
		squareImage: _squareImage = 'https://www.adnan007d.dev/og-image.jpg',
		squareImageWidth = 1200,
		squareImageHeight = 1200
	}: Props = $props();

	let squareImage = $derived(squareImagePath ? `${baseUrl}${squareImagePath}` : _squareImage);
	let image = $derived(imagePath ? `${baseUrl}${imagePath}` : _image);
	let url = $derived(`${baseUrl}${path}`);
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
