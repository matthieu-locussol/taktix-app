import { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => (
   <Html lang="en">
      <Head>
         <link rel="icon" href="/favicon.ico" />
         <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
         <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
         />
      </Head>
      <body>
         <Main />
         <NextScript />
      </body>
   </Html>
);

export default MyDocument;
