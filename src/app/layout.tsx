import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Love Experience",
  description:
    "Персональный сайт-подарок, созданный с любовью. Каждый момент с тобой — бесценен.",
  openGraph: {
    title: "Digital Love Experience",
    description: "Сайт, созданный с любовью для самого важного человека",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0a0a0f] text-white antialiased selection:bg-rose-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}