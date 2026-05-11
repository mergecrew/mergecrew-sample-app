import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Mergecrew Sample App',
  description: 'A tiny Next.js app for trying out Mergecrew end-to-end.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
