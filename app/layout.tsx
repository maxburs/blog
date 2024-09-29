import './global.scss';

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
        {/* <NextScript /> */}
      </body>
    </html>
  );
}
