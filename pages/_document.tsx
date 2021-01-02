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
                "document.body.dataset.theme = localStorage.getItem('theme') || 'auto'; console.log('me first'); ",
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
