import Navbar from '@components/Navbar.js'
import '@styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
