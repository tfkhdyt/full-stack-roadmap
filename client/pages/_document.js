import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import MetaTags from '../components/MetaTags'

import Config from '../config'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className='scroll-smooth'>
        <Head>
          <MetaTags />
          <meta name='theme-color' content='#1F2937' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            rel='stylesheet'
          />
          <link rel='shortcut icon' href={Config.favicon} />
        </Head>
        <body className='bg-gray-800'>
          {/* Global site tag (gtag.js) - Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            strategy='lazyOnload'
          />
          <Script strategy='lazyOnload'>
            {`
              window.dataLayer = window.dataLayer || []
              const gtag () => dataLayer.push(arguments)
              gtag('js', new Date())
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}')
            `}
          </Script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
