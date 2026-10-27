import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'GoogleOther',
          'CCBot',
          'anthropic-ai',
          'ClaudeBot',
          'PerplexityBot',
          'Bytespider',
          'FacebookBot',
          'Applebot-Extended',
          'AI2Bot',
          'Ai2Bot-Dolma',
          'Amazonbot',
          'Applebot',
          'AwarioRssBot',
          'AwarioSmartBot',
          'DataForSeoBot',
          'Diffbot',
          'FriendlyCrawler',
          'ImagesiftBot',
          'img2dataset',
          'ISSCyberRiskCrawler',
          'Kangaroo Bot',
          'Meta-ExternalAgent',
          'Meta-ExternalFetcher',
          'OAI-SearchBot',
          'Omgilibot',
          'PetalBot',
          'Scrapy',
          'Timpibot',
          'VelenPublicWebCrawler',
          'WebGPT',
          'YouBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://tayyab.co/sitemap.xml',
  };
}
