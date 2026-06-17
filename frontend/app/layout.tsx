import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "GameAnalyzer — Premium Football Tips",
  description:
    "Expert football predictions with guaranteed odds. Unlock premium betting slips with 2+, 5+, 10+ odds. GameAnalyzer — bet smarter, win more.",
  keywords:
    "football predictions, betting tips, soccer predictions, betting odds, premium tips, sports betting, GameAnalyzer, game analyzer",
  openGraph: {
    title: "GameAnalyzer — Premium Football Tips",
    description: "Expert football predictions with guaranteed odds. GameAnalyzer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
