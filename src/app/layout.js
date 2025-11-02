import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BukkaIsland | Unforgettable Naija Chow",
  description:
    "From Mainland to Island to Houston TX — experience authentic Naija flavors with BukkaIsland.",
  keywords: [
    "Naija food",
    "African cuisine",
    "Nigerian restaurant",
    "Houston food",
    "BukkaIsland",
  ],
  authors: [{ name: "BukkaIsland Team" }],
  openGraph: {
    title: "BukkaIsland | Unforgettable Naija Chow",
    description:
      "From Mainland to Island to Houston TX — experience authentic Naija flavors with BukkaIsland.",
    url: "https://bukkaisland.com",
    siteName: "BukkaIsland",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BukkaIsland - Unforgettable Naija Chow",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/bukka_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add your font link here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Peralta&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
