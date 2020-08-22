import '../styles/globals.css'
import App from 'next/app'
import Layout from '../components/layout'
import "nprogress/nprogress.css"
import dynamic from 'next/dynamic'

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false },
);

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props

    const getLayout = Component.getLayout || (page => <Layout children={page} />)

    return <><TopProgressBar />{getLayout(<Component {...pageProps} />)}</>
    
  }
}


export default MyApp
