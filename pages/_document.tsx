import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html:
                "document.documentElement.dataset.theme = localStorage.getItem('theme') || 'auto';",
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
