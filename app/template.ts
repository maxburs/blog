import type { Metadata, Viewport } from 'next';
import * as constants from '../constants';

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

// const Meta: React.FC = () => (
//   <>
//     <Head>
//       <link
//         rel="preload"
//         href="/fonts/merriweather/merriweather-latin-400.woff2"
//         as="font"
//         crossOrigin=""
//       />
//       <link
//         rel="preload"
//         href="/fonts/merriweather/merriweather-latin-700.woff2"
//         as="font"
//         crossOrigin=""
//       />
//       <link
//         rel="preload"
//         href="/fonts/montserrat/montserrat-latin-700.woff2"
//         as="font"
//         crossOrigin=""
//       />
//     </Head>
//   </>
// );
