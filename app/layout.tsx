import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BackgroundCanvas from "@/components/background/BackgroundCanvas";
import { BubblesCanvas } from "@/components/bubbles/bubblesCanvas";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/sidebarMenu/Sidebar";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import Footer from "@/components/layout/Footer";
import ViewCanvas from "@/components/cans/ViewCanvas";
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
  themeColor: "#591420",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "BZ1 - Boissons Originales",
    template: "%s | BZ1",
  },
  description:
    "BZ1 - Découvrez nos boissons originales: Cherry, Zero, Lime et plus encore. Des saveurs uniques pour tous les goûts.",
  keywords: [
    "BZ1",
    "boissons",
    "soda",
    "cherry",
    "zero",
    "lime",
    "coffee",
    "bretagne",
  ],
  authors: [{ name: "BZ1" }],
  creator: "BZ1",
  publisher: "BZ1",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://yourdomain.com",
    siteName: "BZ1",
    title: "BZ1 - Boissons Originales",
    description:
      "Découvrez nos boissons originales: Cherry, Zero, Lime et plus encore.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BZ1 - Boissons Originales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BZ1 - Boissons Originales",
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="generator" content="Next.js" />
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
      </head>
      <body
        className={`${poppins.variable} ${creamCake.variable} scrollbar scrollbar-none bg-primary text-secondary overflow-x-hidden antialiased`}
      >
        <BackgroundCanvas />
        <BubblesCanvas />
        <ViewCanvas />

        <Header />
        <Sidebar />
        
        <ResponsiveProvider />
        <SmoothScrollProvider>
          <main className="bg-primary">{children}</main>
        </SmoothScrollProvider>
        <Footer />
      </body>
    </html>
  );
}
