import React, { useEffect, useState } from 'react';

interface ISequenceProps {
  page: number;
  changePage: any;
  arrr: number[];
}
const SequenceGenerator = (props: ISequenceProps): any => {
  const { page, changePage, arrr } = props;

  const handlePageChange = (x: number, event: any) => {
    event.preventDefault();
    changePage(x);
  };
  const list = arrr.map((x: number, i: number) => (
    <div
      onClick={(event) => handlePageChange(x, event)}
      key={i}
      style={{ cursor:"pointer", padding: "2px 4px" }}
    >
      {page === x ? (
        <div style={{ color:"red" }} >{x}</div>
      ) : (
        <div>{x}</div>
      )}
    </div>
  ));
  return list;
};

interface IPaginationProps {
  totalPages?: number;
  totalRecords: number;
  page: number;
  changePage: any;
  numbersToShow: number;
  limit: number;

  isDynamicLimit?: boolean;
  onLimitChange?: any;
  autoLimit?: number;
}

function Pagination(props: IPaginationProps) {
  
  const {
    totalRecords = 0,
    page,
    changePage,
    numbersToShow = 2,
    limit,
  } = props;

  const [arrr, setarr]: [number[], any] = useState([1]);
    
  const start = arrr[0];
  const end = arrr[arrr.length - 1];
  let right = numbersToShow && arrr[numbersToShow - 1];

  const [totalPagesCal, setTotalPagesCal] = useState(1);

  useEffect(() => {
    setTotalPagesCal(Math.ceil(totalRecords / limit));
  }, [totalRecords, limit]);

  useEffect(() => {
    setarr(
      totalPagesCal > 4
        ? [...Array?.from(Array(numbersToShow ? numbersToShow : 4), (_, i) => i + 1)]
        : [...Array?.from(Array(totalPagesCal), (_, i) => i + 1)]
    );
  }, [totalPagesCal]);

  const range = (from: number, to: number, step: number = 1) => {
    const rangee = [];
    for (let i = from; i <= to; i += step) {
      rangee.push(i);
    }
    return rangee;
  };

  const Previous = (event: any) => {
    event.preventDefault();
    if (start <= 1) return;
    if (end === totalPagesCal) {
      right = start - 1;
    } else {
      right = right - numbersToShow;
    }
    const numarr = range(start - numbersToShow, right);
    setarr([...numarr]);
  };
  const Next = (event: any) => {
      event.preventDefault();
      
    if (end >= totalPagesCal) return;
    if (right + numbersToShow >= totalPagesCal) {
      right = totalPagesCal;
    } else {
      right = right + numbersToShow;
    }
    const numarr = range(start + numbersToShow, right);
    setarr([...numarr]);
  };

  return (
    // <div className="py-6 flex items-center justify-between  ">
    <div className="paginationContainer">
      <div  className="paginationContainer">
        <div >
          Showing <span >{(page - 1) * limit + 1}</span> to{' '}
          <span >
            {page * limit > totalRecords ? totalRecords : page * limit}
          </span>{' '}
          entries from <span >{totalRecords}</span>
        </div>
        <div>
          <nav
            className="navPagination"
            aria-label="Pagination"
          >
            <div >
              <i  onClick={Previous} style={{ fontSize:"15px", margin:"0px 8px", cursor: start <= 1 ? "not-allowed" : "pointer" }} className="fa fa-arrow-left"></i>
            </div>

            <SequenceGenerator
              arrr={arrr}
              changePage={changePage}
              page={page}
            />

            <div>
                <i onClick={Next} style={{ fontSize: "15px", margin: "0px 8px", cursor: end >= totalPagesCal ? "not-allowed" : "pointer" }} className="fa fa-arrow-right"></i>
            </div>

          </nav>
        </div>
      </div>
    </div>
  );
}
export default Pagination;
