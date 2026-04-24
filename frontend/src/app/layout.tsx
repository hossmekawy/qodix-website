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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Qodix | Quiet Luxury Digital Solutions",
    template: "%s | Qodix"
  },
  description: "We craft scalable platforms and innovative digital experiences with editorial precision and 'Quiet Luxury' design.",
  keywords: ["Software Agency", "Web Development", "Quiet Luxury Design", "Next.js", "Django", "Digital Solutions"],
  authors: [{ name: "Qodix" }],
  creator: "Qodix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Qodix | Quiet Luxury Digital Solutions",
    description: "We craft scalable platforms and innovative digital experiences with editorial precision.",
    siteName: "Qodix",
    images: [
      {
        url: "/icon.png", // Using the favicon as a fallback OG image
        width: 512,
        height: 512,
        alt: "Qodix Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qodix | Quiet Luxury Digital Solutions",
    description: "We craft scalable platforms and innovative digital experiences with editorial precision.",
    creator: "@qodix",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
