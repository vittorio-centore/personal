import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: "Vittorio's Website",
  description: 'Vittorio Centore portfolio website'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="icon" href="/assets/images/PixelMe_50x50.jpg" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/atropos@2.0.2/atropos.min.css"
        />
      </head>
      <body className="font-mono bg-white relative overflow-x-hidden flex flex-col min-h-screen">
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
