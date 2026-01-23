import { Geist, Geist_Mono, Peralta, Raleway } from "next/font/google";
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

const peralta = Peralta({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-peralta",
  display: "swap",
});

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

// ──────────────────────────────────────────────────────────────
// Site Configuration
// ──────────────────────────────────────────────────────────────
const SITE_URL = "https://bukkaisland.com";
const OG_IMAGE = `${SITE_URL}/bukka_nav.jpg`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    siteName: "BukkaIsland",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "BukkaIsland - Unforgettable Naija Chow",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BukkaIsland | Unforgettable Naija Chow",
    description:
      "From Mainland to Island to Houston TX — experience authentic Naija flavors with BukkaIsland.",
    images: [OG_IMAGE],
  },

  icons: {
    icon: "/bukka_logo.png",
    apple: "/bukka_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${peralta.variable} ${raleway.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}