import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const BASE_URL = "https://fitconmi.com";
const OG_IMAGE = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&fit=crop&crop=center";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FitConMi — Fitness Programs",
    template: "%s | FitConMi — Fitness Programs",
  },
  description:
    "Science-backed fitness programs for weight loss, muscle building, strength & endurance. Personalized plans for men & women. Start free today.",
  keywords: [
    "fitness programs",
    "science-based training",
    "weight loss program",
    "muscle building",
    "strength training",
    "workout plan",
    "HIIT",
    "endurance training",
    "flexibility",
    "body recomposition",
  ],
  authors: [{ name: "FitConMi", url: BASE_URL }],
  creator: "FitConMi",
  publisher: "FitConMi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "FitConMi",
    title: "FitConMi — Science-Based Fitness Programs",
    description:
      "Science-backed fitness programs for weight loss, muscle building, strength & endurance. Personalized plans for men & women. Start free today.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Athletes training together in a professional gym — FitConMi fitness programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fitconmi",
    creator: "@fitconmi",
    title: "FitConMi — Science-Based Fitness Programs",
    description:
      "Science-backed fitness programs for weight loss, muscle building, strength & endurance. Start free today.",
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "FitConMi",
  url: BASE_URL,
  logo: `${BASE_URL}/fitconmi-logo.svg`,
  description:
    "Science-backed fitness training programs for men and women covering weight loss, muscle building, strength, endurance, flexibility, and body recomposition.",
  sameAs: [
    "https://instagram.com/fitconmi",
    "https://tiktok.com/@fitconmi",
    "https://youtube.com/@fitconmi",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free fitness programs for men and women",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${BASE_URL}/contact`,
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
      className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Motion.js — for click/interaction animations */}
        <script
          src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"
          async
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
