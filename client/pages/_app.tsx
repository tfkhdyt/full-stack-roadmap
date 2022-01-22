import type { AppProps /*, AppContext */ } from 'next/app'
import { ToastContainer } from 'react-toastify'
import Script from 'next/script'
import { AnimatePresence } from 'framer-motion'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

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
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      bodyClassName='font-semibold'
    />
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Component {...pageProps} />
    </AnimatePresence>
  </>
)

export default App
