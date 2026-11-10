import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LUMEN — Precision Lab',
  description: 'Immersive laser epilation engineering lab.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#050505', color: '#fff', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
