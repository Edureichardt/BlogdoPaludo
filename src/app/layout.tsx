import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Advogado Paludo | Direito em Rio Negro e Mafra',
  description: 'Atendimento jurídico em Rio Negro (PR) e Mafra (SC) nas áreas cível, trabalhista e previdenciária. Fale com o Advogado Paludo.',
  icons: {
    icon: '/favicon-paludo.ico',
  },
  verification: {
    google: 'QUOLqHtBtgNnmEI9grUTsVLrdibZ5p9p6maNjh_EXwU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "name": "Advogado Paludo",
              "image": "https://blogdopaludo.com.br/logo.png", // Atualize se necessário
              "url": "https://blogdopaludo.com.br",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rio Negro",
                "addressRegion": "PR",
                "addressCountry": "BR"
              },
              "areaServed": ["Rio Negro", "Mafra"],
              "telephone": "+5547998452091", // Atualize com o telefone real
              "priceRange": "Sob consulta"
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
