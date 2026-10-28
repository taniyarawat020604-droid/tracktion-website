import type { Metadata } from "next";
import { Poppins, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const jbmono = JetBrains_Mono({ variable: "--font-jbmono", subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Tracktion",
  description: "We grow creators, founders & brands on social. Personal branding, LinkedIn ghostwriting, Reels, YouTube and podcasts from New Delhi.",
  icons: { icon: "/brand/logo.jpg" },
  openGraph: {
    title: "Tracktion",
    description: "Your Story. Our Strategy. Real Traction.",
    images: ["/brand/cover.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${hanken.variable} ${jbmono.variable} antialiased`}>
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
