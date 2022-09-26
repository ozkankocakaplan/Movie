import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { setupStore } from '../src/store'
import { AuthProvider } from '../src/hooks/useAuth';
import Layout from '../src/components/Layout';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AuthProvider>


}
export default MyApp
