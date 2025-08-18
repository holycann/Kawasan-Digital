"use client";

import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import AppProvider from "../providers/AppProvider";
import { Toast } from "@/components/ui/toast";

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


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname.startsWith("/login");

  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}
      >
        <AppProvider>
          {!isDashboard && !isLogin && <Navigation />}
          <main className="flex-1">
            {children}
          </main>
          {!isDashboard && !isLogin && <Footer />}
          <Analytics mode="production" />
          <SpeedInsights />
          <div id="dialog-root"></div>
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
