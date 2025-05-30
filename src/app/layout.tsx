"use client";

import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Providers } from "@/lib/redux/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Define routes where header/footer should NOT show
const HIDE_HEADER_ROUTES = ["/login", "/signup"];
const HIDE_FOOTER_ROUTES = ["/auth", "/signup"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showHeader = !HIDE_HEADER_ROUTES.includes(pathname);
  const showFooter = !HIDE_FOOTER_ROUTES.includes(pathname);

  return (
    <html lang="en">
       <body className="min-h-screen flex flex-col bg-white">
        <SessionProvider>
          <Providers>
            {showHeader && <Header />}
            <main className="flex-1 w-full">{children}</main>
            {showFooter && <Footer />}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}