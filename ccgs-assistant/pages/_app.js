import '../styles/globals.css'
import App from 'next/app'
import Layout from '../components/layout'

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props

    const getLayout = Component.getLayout || (page => <Layout children={page} />)

    return getLayout(<Component {...pageProps} />)
    
  }
}


export default MyApp
