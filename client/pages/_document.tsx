import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

import MetaTags from '../components/MetaTags'
import Config from '../config'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    return (
      <Html className='scroll-smooth'>
        <Head>
          <MetaTags />
          <meta name='theme-color' content='#1F2937' />
          <link rel='preconnect' href='https://fontbit.io' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fontbit.io/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            rel='stylesheet'
          />
          <link rel='shortcut icon' href={Config.favicon} />
        </Head>
        <body className='bg-gray-800'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
