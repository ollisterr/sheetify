import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';

import { StyledComponentsRegistry } from '../lib/StyledComponentsRegistry';
import { ServerStyleSheet } from 'styled-components';

export default class DocumentPage extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
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
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
