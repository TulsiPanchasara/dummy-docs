import React, { Fragment, useEffect, useState } from 'react'
import { deleteDoc, getAllDocs } from '../../auth/docsCRUD'
import { tableColumnsHeaders, TIMEOUT_VALUE } from '../../config/constants'
import { docsType, tableColumnType } from '../../interface/docsType'
import styles from '../../styles/Home.module.css'
import Pagination from './Pagination'

const TableView = () => {
  const [dataList, setDataList] = useState([] as docsType[]);
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageLimit = 2;

  useEffect(() => {
    getAllData()
  }, [page])

  const getAllData = () => {
    try {
      const response = getAllDocs();
      setDataCount(response.length);
      let sortedRes = response.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        })
      
      const total = Math.ceil(response.length / 2);
      setTotalPages(total);
      const startIndex = (page * pageLimit) - pageLimit;
      const endIndex = startIndex + pageLimit;
      let paginatedData = sortedRes.slice(startIndex, endIndex)
      setDataList(paginatedData);
    } catch (error) {
      console.log('Something went wrong in get list');
    }
  }

  const deleteData = (id: number) => {
    const response = deleteDoc(id);
    if (response) {
      setTimeout(() => {
        
        getAllData()
      }, TIMEOUT_VALUE);
    }
  }

  const changePage = (page: number) => {
    setPage(page);
  };
  
  

  return (
    <div style={{padding: "10px 40px"}}>
        <table className={styles.table} >
          <thead  >
          <tr>
            {tableColumnsHeaders.map((header: { name: string }, idx: number) => {
              return (
                <th style={{ minWidth: "150px", textAlign:"left", borderBottom:"2px solid #989898" }} key={idx}>
                  {header.name}
                </th>  
              )
            })}
            </tr>
          </thead>
        <tbody>
          {dataList && dataList.length ? (
            <>
              {dataList.map((d: docsType, idx: number) => {
                return (
                  <tr key={idx} >
                    {tableColumnsHeaders.map((tHeader: tableColumnType, idx: number) => {
                      
                      if (tHeader.type === 'action') {
                        return (
                          <Fragment key={idx} >
                            {tHeader.value == 'VIEW' &&
                              <td style={{ minWidth: "150px" }} >
                                <a href={`/docs/${d.id}`} style={{ textDecoration:"underline" }} >View</a>
                            </td>}
                            {tHeader.value == 'EDIT' &&
                              <td style={{ minWidth: "150px" }} >
                                <a href={`/docs/edit/${d.id}`}>Edit</a>
                              </td>}
                            {tHeader.value == 'DELETE' &&
                              <td style={{ minWidth: "150px" }} >
                                <button style={{ cursor: "pointer" }} onClick={() => deleteData(d.id)} >Delete</button>
                              </td>}
                          </Fragment>
                        )
                      }
                      if (tHeader.type === 'field') {
                        return (
                        //@ts-ignore
                        <td style={{ minWidth: "150px" }} key={idx} >{d[tHeader.value]}</td>
                        )
                        
                      }
                    })}        
                  </tr>
                )
              })}
            </>
          ): (
              <tr >
                <td colSpan={tableColumnsHeaders.length} style={{ textAlign: "center", padding: "20px" }} >
                  No Documents found
                </td>
              </tr>
          )}
          {dataCount > 0 &&  <tr style={{ textAlign: "end" }} >
            <td colSpan={tableColumnsHeaders.length} >
              <Pagination
                //currnet page
                page={page}
                // total pages in pagination
                totalPages={totalPages}
                // total recods in list
                totalRecords={dataCount}
                // limit to show in pagination
                limit={2}
                // page numbers to show in selection
                numbersToShow={2}
                // on change page
                changePage={changePage}
              />
            </td>
          </tr>}
          </tbody>
        </table>
      </div>
  )
}

export default TableView