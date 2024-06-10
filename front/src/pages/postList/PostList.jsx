import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Pagination from "react-js-pagination"
import "./postList.css"
import "./pagination.css"

export default function PostList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [items] = useState(8);
  const dataLength = data.length;

  useEffect(() => {
   axios
      .get("http://localhost:8080/api/board/")
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [dataLength]);

  const handlePageChange = (page) => { setPage(page); };

  return (
    <>
      <div className="dataBox">
        {data.slice(
          items * (page - 1),
          items * (page - 1) + items
        ).map((data, i) => {
          return (
            <div className="dataBody" key={data.id}>
              <Link to={`post/${data.id}`}>
                <img src={`upload/${data.boardFile}`} alt="" />
                <div className="dataTitle">
                  <b>{data.boardTitle}</b>
                </div>
                <div className="dataContents">
                  <p>{data.boardContents}</p>
                </div>
                <div className="dataWriter">
                  <span>
                    <p>by <b>{data.boardWriter}</b></p>
                    <p>{data.boardRegDate}</p>
                  </span>
                </div>
              </Link>
            </div>
          )
        })}
      </div>

      <div className="Pagination">
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={data.length - 1}
          pageRangeDisplayed={5}
          onChange={handlePageChange}>
        </Pagination>
      </div>
    </>
  )
}