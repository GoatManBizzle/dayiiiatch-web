import type { Metadata } from "next";
import "./globals.css";
import { siteMeta } from "@/config/site-meta";

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: siteMeta.title,
  description: siteMeta.description,
  keywords: siteMeta.keywords,
  applicationName: siteMeta.siteName,
  authors: [{ name: siteMeta.siteName }],
  creator: siteMeta.siteName,
  publisher: siteMeta.siteName,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: siteMeta.siteName,
    images: [
      {
        url: siteMeta.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteMeta.siteName} social preview`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [siteMeta.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}