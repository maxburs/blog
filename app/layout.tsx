import type { Metadata, Viewport } from 'next';
import * as constants from '../constants';
import localFont from 'next/font/local';

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

const merriweather = localFont({
  src: [
    {
      path: '../public/fonts/merriweather/merriweather-latin-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/merriweather/merriweather-latin-400italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/merriweather/merriweather-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/merriweather/merriweather-latin-700italic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--merriweather',
});

const montserrat = localFont({
  src: '../public/fonts/montserrat/montserrat-latin-700.woff2',
  weight: '700',
  style: 'bold',
  variable: '--montserrat',
});

const sfMonoRegular = localFont({
  src: '../public/fonts/SFMono-Regular.ttf',
  variable: '--sf-mono-regular',
});

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
    <html
      lang="en"
      className={`${merriweather.variable} ${montserrat.variable} ${sfMonoRegular.variable}`}
    >
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
