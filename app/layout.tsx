import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthModal from '@/components/ui/AuthModal';
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindMesh - Your AI Second Brain",
  description: "Store bookmarks, notes, docs & voice notes...",
  icons: {
    icon: "/puzzle club (1).png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-black`}>
        <Providers session={session}>
          <Header />
          {children}
          <AuthModal />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}