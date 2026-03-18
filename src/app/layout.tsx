import type { Metadata } from "next"
import "./globals.scss"

export const metadata: Metadata = {
  title: "Web Developer and Designer | Asif Khan",
  description:
    "For over 3 years, I've been helping startups, corporate businesses, non-profits, and pets launch their online businesses and I can do the same for you.",
  openGraph: {
    title: "Asif Khan",
    description:
      "For over 3 years, I've been helping startups, corporate businesses, non-profits, and pets launch their online businesses and I can do the same for you.",
    images: [
      {
        url: "https://res.cloudinary.com/asif10388/image/upload/v1633337877/work-images/og-image.jpg",
        alt: "Open Graph Image",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    creator: "@asif10388",
    title: "Asif Khan",
    description:
      "For over 5 years, I've been helping startups, corporate businesses, non-profits, and pets launch their online businesses and I can do the same for you.",
  },
  authors: [{ name: "Asif Khan", url: "https://asifkhandev.netlify.app" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
