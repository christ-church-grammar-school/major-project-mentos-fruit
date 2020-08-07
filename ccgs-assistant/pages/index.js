import Head from 'next/head'
import Link from 'next/link'
import { useFetchUser } from '../lib/user'
import Layout from '../components/layout'

export default function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading}>
      <div>
        -------------------------
        BLAH
      </div>
    </Layout>
  )
}
