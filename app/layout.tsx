import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ResponsiveProvider } from "@/components/providers/ResponsiveProvider";

const creamCake = localFont({
  variable: "--font-cream-cake",
  src: "../public/font/Cream Cake.otf",
  display: "swap",
});

const poppins = localFont({
  variable: "--font-poppins",
  src: "../public/font/poppins-extrabold.ttf",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f5ddd2",
};

export const metadata: Metadata = {
  title: {
    default: "Breizh Cola - Boissons Originales",
    template: "%s | Breizh Cola",
  },
  description:
    "Breizh Cola - Découvrez nos boissons originales: Cherry, Zero, Lime et plus encore. Des saveurs uniques pour tous les goûts.",
  keywords: [
    "Breizh Cola",
    "boissons",
    "soda",
    "cherry",
    "zero",
    "lime",
    "coffee",
    "bretagne",
  ],
  authors: [{ name: "Breizh Cola" }],
  creator: "Breizh Cola",
  publisher: "Breizh Cola",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://yourdomain.com",
    siteName: "Breizh Cola",
    title: "Breizh Cola - Boissons Originales",
    description:
      "Découvrez nos boissons originales: Cherry, Zero, Lime et plus encore.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Breizh Cola - Boissons Originales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Breizh Cola - Boissons Originales",
    description:
      "Découvrez nos boissons originales: Cherry, Zero, Lime et plus encore.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/fav-192.png" />
        <meta name="theme-color" content="#f5ddd2" />
        <meta name="generator" content="Next.js" />
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
      </head>
      <body
        className={`${poppins.variable} ${creamCake.variable} scrollbar scrollbar-none bg-primary text-secondary overflow-x-hidden antialiased`}
      >
        <ResponsiveProvider />
        <SmoothScrollProvider>
          <main className="bg-primary relative">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
