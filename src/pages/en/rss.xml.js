import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'DevOps and Technology Blog | Pierre-Louis Leclerc | Proxyfil',
    description: 'Welcome to my blog, where I share my passion for computer science, DevOps, and the latest technology trends.',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en</language>`,
  });
}