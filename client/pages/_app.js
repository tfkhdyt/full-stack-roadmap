import '../styles/globals.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script>
        {`
          window.dataLayer = window.dataLayer || []
          const gtag = (...arguments) => dataLayer.push(arguments)
          gtag('js', new Date())
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}')
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
