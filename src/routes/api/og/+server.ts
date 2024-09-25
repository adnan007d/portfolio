import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import JetBrainsMono from '$lib/JetBrainsMono-Regular.ttf';
import type { RequestHandler } from './$types';
import { html } from 'satori-html';
import { read } from '$app/server';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');
	const type = url.searchParams.get('type') ?? 'regular';

	if (!slug) {
		console.error('No slug provided');
		return error(404);
	}

	const blog = await import(`@/blogs/${slug}.md`)
		.then((d) => d.metadata)
		.catch((err) => {
			console.error(err);
			return error(404);
		});

	const width = 1200;
	const height = type === 'square' ? 1200 : 630;

	const htm = html(`
<div style="font-family:'JetBrainsMono';background:#1d1d1d; color:white; display:flex;align-items:center;justify-content:center;height:100%;width:100%">
  <div style="display:flex;flex-direction:column;margin-left:2%; margin-right:2%;">
	<p style="font-size: 2.5rem;display:flex; text-align:center;text-transform: uppercase; margin-left: auto; margin-right:auto">${blog.title}</p>
  <p style='color: hsl(273 98% 60%);display:block; line-clamp: 3 "...";font-size: 1.25rem;text-transform: uppercase;text-align: center; margin-left: auto; margin-right:auto'>${blog.description}</p>
  </div>
	<p style="font-size:1.25rem; position:absolute; bottom:2%; right:2%; text-transform: uppercase;">By Adnan Mansuri</p>
</div>
`);
	const fontData = await read(JetBrainsMono).arrayBuffer();
	const str = await satori(htm, {
		width,
		height,
		fonts: [
			{
				name: 'JetBrainsMono',
				weight: 400,
				style: 'normal',
				data: fontData
			}
		]
	});

	return new Response(
		new Resvg(str, {
			fitTo: {
				mode: 'width',
				value: width
			}
		})
			.render()
			.asPng(),
		{
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': 'public, max-age=0, must-revalidate'
			}
		}
	);
};
