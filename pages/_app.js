import Navbar from '@components/Navbar.js'
import { useUser } from '@lib/hooks.js'
import store from '@lib/redux/store'
import '@styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  useUser(store)

  return (
    <Provider store={store}>
      <Navbar />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  )
}

export default MyApp
