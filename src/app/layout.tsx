import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Heritage Site Crowd Management System | Smart-Tourism AI Platform',
  description:
    'Smart-tourism platform for heritage destinations like the Taj Mahal, Varanasi Ghats, and national monuments. Displays historical information, ticket details, expected crowd levels, time-slot availability, and live entry statistics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased selection:bg-[#48bb78] selection:text-white">
        {children}
      </body>
    </html>
  );
}
