import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";
import { banglaDate } from "@/lib/format";

const font = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bn",
  display: "swap",
});

export const metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এবং দাম বাড়া-কমার তথ্য।",
};

async function safe(fn) {
  try {
    return await fn();
  } catch {
    return [];
  }
}

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([
    safe(getCategories),
    safe(() => getProducts()),
  ]);

  return (
    <html lang="bn" data-theme="bazardor">
      <body className={`${font.variable} flex min-h-screen flex-col antialiased`}>
        <Navbar categories={categories} dateText={banglaDate()} />
        <Ticker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
