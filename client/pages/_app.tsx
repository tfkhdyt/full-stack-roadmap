import type { AppProps /*, AppContext */ } from 'next/app'
import Script from 'next/script'

import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    {/* Global site tag (gtag.js) - Google Analytics */}
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
    />
    <Script>
      {`
          window.dataLayer = window.dataLayer || []
          function gtag () { dataLayer.push(arguments) }
          gtag('js', new Date())
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}')
        `}
    </Script>
    <Component {...pageProps} />
  </>
)

export default App
