import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  title: "FitConmi | Programmes Fitness Bases sur la Science",
  description:
    "Transformez votre corps avec des programmes d'entrainement scientifiques. Gratuit pour debutants et sportifs avances. Nutrition, calculs IMC et plus.",
  alternates: {
    canonical: "https://fitconmi.com",
  },
  openGraph: {
    title: "FitConmi | Programmes Fitness Bases sur la Science",
    description:
      "Transformez votre corps avec des programmes d'entrainement scientifiques. Gratuit pour debutants et sportifs avances. Nutrition, calculs IMC et plus.",
    url: "https://fitconmi.com",
    siteName: "FitConmi",
    type: "website",
    images: [
      {
        url: "https://fitconmi.com/fitconmi-logo.svg",
        width: 1200,
        height: 630,
        alt: "FitConmi logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitConmi | Programmes Fitness Bases sur la Science",
    description:
      "Transformez votre corps avec des programmes d'entrainement scientifiques. Gratuit pour debutants et sportifs avances. Nutrition, calculs IMC et plus.",
    images: ["https://fitconmi.com/fitconmi-logo.svg"],
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
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
