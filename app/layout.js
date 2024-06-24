import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sonu sir classes",
  description: "Sonu sir classes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
          <head>
      <link rel="icon" href="/image/favicon.ico"/>
      <link rel="manifest" href="/manifest.json"/>
      <meta name="theme-color" content="#0088ff" />
      <meta property="og:title" content="Sonu sir classes" />
      <meta property="og:type" content="website" />
      <meta property="og:URL" content="http://admin.fgpcodecrafters.site" />
      <meta property="og:image" content="https://fgpcodecrafters.site/192.png" />
      <meta name="keywords" content="code-crafters fgp, codecraftersfgp"/>
      <meta property="og:description" content="Welcome to Code Crafters Community, your hub for student collaboration and innovation. Join us to explore coding, share ideas, and create together!" />
      <meta name="robots" content="index, follow"/>
      </head>
      <body className={inter.className}>
        <Navbar/>
        <div className="">
        {children}
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" defer  />
      </body>
    </html>
  );
}
