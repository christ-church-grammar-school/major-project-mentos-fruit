import Head from 'next/head'
import Link from 'next/link'
import { useFetchUser } from '../lib/user'
import styles from "../styles/index.module.css"
import { getLayout } from '../components/layout'

function Home() {
  const { user, loading } = useFetchUser()
  const d = new Date()
  const periods = [
    {label: "Tutorial", time: "8.30am-8.50am"},
    {label: "Period 1", time: "8.55am-9.45am"},
    {label: "Period 2", time: "9.50am-10.40am"},
    {label: "Period 3", time: "11.00am-11.50am"},
    {label: "Period 4", time: "11.55am-12.45pm"},
    {label: "Period 5", time: "8.30pm-8.50am"},
    {label: "Period 6", time: "8.30am-8.50am"}
  ]
  const extLinks = [
    {label: "Nexus", subtitle: "CCGS Online Resources", icon: "/", url: "https://nexus.ccgs.wa.edu.au"},
    {label: "CCGS Website", subtitle: "The school's official website", icon: "/", url: "https://ccgs.wa.edu.au"}
  ]

  var state = undefined

  if (18 > d >= 12) {
    state = "afternoon"
  } else if (d >= 18) {
    state = "evening"
  } else {
    state = "morning"
  } 

  return (
      <>
      {loading ? <>LOADING</> : <>
        {!user ? <p>User Not Signed In. Please sign in at the bottom left.</p> : <>
          <div>
            <h1 className={styles.status}>Good {state}, {user.name}.</h1>
            {(d.getDay != 0 || d.getDay != 6) ? <>
            <p className={styles.today}>Today: </p>
            <table className={styles.docLinks}>
              <thead className={styles.tableLinks}>
                  <tr>
                    {periods.map((el, index, arr) => {
                      if (index === 0) {
                        return <th className={[styles.tableHead, styles.left].join(' ')}>{el.label}<br/><p className={styles.theadtime}>{el.time}</p></th>
                      } else if (index === arr.length-1) {
                        return <th className={[styles.tableHead, styles.right].join(' ')}>{el.label}<br/><p className={styles.theadtime}>{el.time}</p></th>
                      } else {
                        return <th className={styles.tableHead}>{el.label}<br/><p className={styles.theadtime}>{el.time}</p></th>
                      }
                    })}
                  </tr>
              </thead>
            </table>
            </> : <></>}
          </div>
      </>}</>}
      </>
  )
}

Home.getLayout = getLayout

export default Home
