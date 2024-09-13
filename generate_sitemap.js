import fs from 'node:fs';
import glob from 'fast-glob';

// Don't add a trailing slash
const site = 'https://www.adnan007d.dev';

async function main() {
	const routes = await glob('./src/routes/**/+page.svelte');
	const pages = [];
	for (const route of routes) {
		pages.push(site + route.replace('./src/routes', '').replace('+page.svelte', ''));
	}

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
${pages.map(
	(page) =>
		`<url>
  <loc> ${page} </loc>
  <changefreq> weekly </changefreq>
  <priority> 0.5 </priority>
</url>
`
)}
</urlset>`.trim();

	await fs.promises.writeFile('./static/sitemap.xml', content);
}

main();
