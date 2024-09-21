import { getBlogs } from '$lib';
// Don't add a trailing slash
const site = 'https://www.adnan007d.dev';
async function sitemap() {
	const routes = Object.keys(
		import.meta.glob(['/src/routes/**/+page.svelte', '!/src/routes/**/\\[slug\\]/+page.svelte'], {
			eager: true
		})
	);
	console.log(routes);
	const pages = [] as string[];
	for (const route of routes) {
		pages.push(route.replace('/src/routes/', '').replace('+page.svelte', ''));
	}

	const blogs = await getBlogs();
	blogs.forEach((blog) => pages.push(`blogs/${blog.slug}/`));

	console.log(pages);

	const content = `
<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="https://www.w3.org/1999/xhtml"
	xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
	xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
	xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
	xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
${pages
	.map(
		(page) =>
			`<url>
  <loc> ${site}/${page} </loc>
  <changefreq> weekly </changefreq>
  <priority> 0.5 </priority>
</url>
`
	)
	.join('')}
</urlset>`.trim();

	return content;
}

export async function GET() {
	const body = await sitemap();
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');
	return response;
}
