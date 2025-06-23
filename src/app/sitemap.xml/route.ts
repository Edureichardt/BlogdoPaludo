// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://blogdopaludo.com.br';

  const urls = [
    '',
    '/sobre',
    '/contato',
    '/advogado-em-rio-negro',
    '/advogado-em-mafra',
    '/artigos/como-funciona-acao-trabalhista',
    '/artigos/direito-previdenciario-aposentadoria',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url><loc>${baseUrl}${url}</loc><priority>0.8</priority></url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
