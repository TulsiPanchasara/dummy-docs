import React from 'react'
import styles from '../../styles/Home.module.css'

const TableView = () => {
  return (
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
  )
}

export default TableView