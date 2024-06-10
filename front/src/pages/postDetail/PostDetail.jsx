import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import "./postDetail.css"

export default function PostDetail() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const updateHandle = () => {
    navigate(`/post/edit/${data.id}`);
  }

  const deleteHandle = () => {
    axios
      .get("http://localhost:8080/api/board/delete/@" + id)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));  
    navigate("/", {replace: true});
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/board/@" + id)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="postDetailBox" key={data.id}>
      <div className="postDetail">
        <img src={`/upload/${data.boardFile}`} className="postDetailImg" alt="" />
        {
         sessionStorage.getItem("memberID") === null &&
         sessionStorage.getItem("memberPassword") === null ? null :
          <div className="postUpdate">
            <span
              className="postIcon"
              onClick={updateHandle}>
              <i className="fa-regular fa-pen-to-square" />
            </span>
            <span
              className="postIcon"
              onClick={deleteHandle}>
              <i className="fa-regular fa-trash-can" />
            </span>
          </div>
        }
        <b className="postDetailTitle">{data.boardTitle}</b>
        <div className="postDetailInfo">
          <span className="postWriter">by <b>{data.boardWriter}</b>
          </span>
          <span className="postRegDate">{data.boardRegDate}</span>
        </div>
        <p className="postDetailContents">{data.boardContents}</p>
      </div>
    </div>
  )
}