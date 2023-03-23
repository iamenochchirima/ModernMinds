import { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../lib/gtag";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}');
                    `,
          }}
        />
      </body>
    </Html>
  );
}
