import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
        name="description"
        content="Databse all about plants!"
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>

      <footer></footer>
    </Html>
  )
}