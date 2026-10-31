import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ScrollEffects from "@/components/ScrollEffects";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Warden",
  description: "Manage smarter",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
   <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollEffects />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
