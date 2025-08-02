import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    display: "swap",
});

const poppins = Poppins({
    variable: "--font-poppins",
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
  title: "Kawasan Digital - Digital Innovation Partner",
  description: "Kawasan Digital specializes in digital innovation through app development, website creation, and SaaS solutions.",
  icons: {
    icon: [
      { url: "/Logo.png", type: "image/png" },
      { url: "/Logo.png", sizes: "32x32", type: "image/png" },
      { url: "/Logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
        <html lang="en">
            <body
                className={`${montserrat.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}
            >
                <Navigation />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
                <Analytics mode="production" />
                <SpeedInsights />
            </body>
        </html>
    );
}
