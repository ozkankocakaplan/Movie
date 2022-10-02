import Layout from '../src/components/Layout';
import { config } from '@fortawesome/fontawesome-svg-core'
import { Provider } from 'react-redux'
import { AuthProvider } from '../src/hooks/useAuth';
import { store } from '../src/store'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;


function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  </Provider>


}
export default MyApp
