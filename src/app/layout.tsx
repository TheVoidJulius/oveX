import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Anton } from "next/font/google";
import "./globals.css";
import { brand, seo } from "@/config/brand";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});










export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  // TODO: CONNECT — Replace with real canonical URL
  metadataBase: new URL(brand.canonicalUrl),
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: brand.canonicalUrl,
    siteName: brand.name,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: brand.name }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
    creator: seo.twitterHandle,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollFX from "@/components/ScrollFX";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${notoDevanagari.variable} ${anton.variable}`}>
      <head>
        {/* JSON-LD Structured Data — truthful product info only */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: brand.name,
              description: seo.description,
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/PreOrder",
                description: "Early access — pricing to be determined",
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="pulse"
          themes={["pulse", "noir"]}
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {/* Noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />
          <CustomCursor />
          <ScrollFX>{children}</ScrollFX>
        </ThemeProvider>
      </body>
    </html>
  );
}
