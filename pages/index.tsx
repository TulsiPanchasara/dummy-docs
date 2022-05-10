import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getUserSession, userLogout } from '../auth/auth'
import { loginType } from '../interface/session'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [userSession, setUserSession] = useState({} as loginType);

  useEffect(() => {
    getSession();
  }, [])

  const getSession = () => {
    let data = getUserSession();
    if (data && data.email) {
      setUserSession(data)
    } else {
            alert("You need to login");
            window.location.href = "/login"
        }
  }

  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav style={{ borderBottom: "1px solid black", padding: "0px 40px", display: "flex",width:"100%", justifyContent: "space-between" }} >
        <h1>Documents</h1>
        {userSession && userSession.email && <div style={{ display: "flex", alignItems:"center" }} >
          <div style={{ paddingRight: "10px" }} >{userSession.email}</div>
          <a style={{ cursor: "pointer" }} onClick={() => userLogout()} >Logout</a>
        </div>}
      </nav>
      <div style={{  padding: "10px 40px", display: "flex",width:"100%", justifyContent: "space-between" }}  >
        <div style={{ fontWeight:  "bold", fontSize:"25px" }} >List of Documents</div>
        <button style={{ background:"black", color:"white", borderRadius:"5px", fontSize:"14px" }} ><a href="/docs/add">+ Add New Doc</a></button>
      </div>
      <main className={styles.container} >
        <table className={styles.table} >
          <thead>
            <tr>
              <th>
                First name
              </th>
              <th>
                Last name
              </th>
              <th>
                View
              </th>
              <th>
                Edit
              </th>
              <th>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                First name
              </td>
              <td>
                Last name
              </td>
              <td>
                <a href="/doc/1">View</a>
              </td>
              <td>
                <button style={{ cursor: "pointer" }} >Edit</button>
              </td>
              <td>
                <button style={{ cursor: "pointer" }} >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default Home
