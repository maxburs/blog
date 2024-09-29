import type { Metadata, Viewport } from 'next';
import * as constants from '../constants';

import './global.scss';

export const metadata: Metadata = {
  title: constants.title,
  authors: [{ name: constants.author.name }],
  description: constants.description,
  keywords: 'blog, typescript, react, javascript, programming',
  icons: [{ type: 'image/png', url: '/favicon/favicon.ico' }],
  alternates: {
    types: {
      'application/atom+xml': '/atom.xml',
      'application/rss+xml': '/rss.xml',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.dataset.theme = localStorage.getItem('theme') || 'auto';",
          }}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
