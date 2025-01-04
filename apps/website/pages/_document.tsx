import { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => (
   <Html lang="en">
      <Head>
         <link href="/favicon.ico" rel="icon" />
         <link href="https://fonts.googleapis.com" rel="preconnect" />
         <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
         <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
         />
         <title>Taktix | The crapiest MMORPG ever.</title>
      </Head>
      <body>
         <Main />
         <NextScript />
      </body>
   </Html>
);

export default MyDocument;
