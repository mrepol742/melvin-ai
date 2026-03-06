import type { Metadata } from "next";
import { Source_Code_Pro, Maven_Pro } from "next/font/google";
import "./globals.css";
import DevToolsDetector from "@/components/DevToolsDetector";
import NextTopLoader from "nextjs-toploader";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Melvin AI",
  description: "Melvin AI - Your AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const env = process.env.NEXT_PUBLIC_NODE_ENV || "production";
  const isProduction = env === "production";

  return (
    <html
      lang="en"
      className={`${sourceCodePro.variable} ${mavenPro.variable}`}
    >
      <head>
        <meta name="hostname" content="ai.melvinjonesrepol.com" />
        <link rel="canonical" href="https://ai.melvinjonesrepol.com" />
      </head>
      <body className="antialiased">
        <NextTopLoader showSpinner={false} />
        {children}
        {isProduction && (
          <>
            <DevToolsDetector />
          </>
        )}
      </body>
    </html>
  );
}
