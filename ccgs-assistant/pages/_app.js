import '../styles/globals.css'
import App from 'next/app'

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props

    const getLayout = Component.getLayout || (page => <SiteLayout children={page} />)

    return getLayout(<Component {...pageProps} />)
  }
}


export default MyApp
