import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { PwaBridge, Toaster } from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: "HR Learning Zone — RAC NSDA Level 2 + GED",
    template: "%s · HR Learning Zone",
  },
  description:
    "An offline-first learning, practice and assessment zone for NSDA RAC Level 2 (Refrigeration & Air Conditioning) and all four GED subjects. Built by HR.",
  applicationName: "HR Learning Zone",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "HR Learning Zone" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  authors: [{ name: "HR" }],
  creator: "HR",
  keywords: ["NSDA", "RAC Level 2", "Refrigeration and Air Conditioning", "GED", "Bangladesh", "offline learning", "BNQF"],
};

export const viewport: Viewport = {
  themeColor: "#080A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          {children}
          <Toaster />
          <PwaBridge />
        </AppProvider>
      </body>
    </html>
  );
}
