import App from '@pages/_app';
import { StyledComponentsRegistry } from 'lib/StyledComponentsRegistry';
import Script from 'next/script';
import { PropsWithChildren } from 'react';

export default function Document({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />

        <link
          rel="shortcut icon"
          sizes="180x180"
          href="/sheetify-favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/sheetify-favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/sheetify-favicon.png"
        />

        <link rel="shortcut icon" href="/sheetify-favicon.png" />

        <link
          href="https://fonts.googleapis.com/css?family=Gaegu:400,700"
          rel="stylesheet"
        />

        <Script
          data-domain="sheetify.kiikkila.com"
          src="https://plausible.io/js/plausible.js"
          async
        />
      </head>

      <body>
        <StyledComponentsRegistry>
          <App>{children}</App>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
