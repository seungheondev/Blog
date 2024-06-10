import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./postEdit.css"

export default function PostEdit() {
  const [contents, setContents] = useState("");
  const [data, setData] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();
  const updateData = {
    id: id,
    boardContents: contents,
  }

  const saveContents = (e) => {
    setContents(e.target.value);
  }

  const edit = () => {
    axios
      .post("http://localhost:8080/api/board/update/@" + id, updateData)
      .then(res => res.data)
      .catch(err => console.log(err));
    navigate("/", {replace: true});
  }
  const editFail = (e) => {
    e.preventDefault();
    alert("修正する内容を入力してください。")
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/board/@" + id)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="update">
      <form className="updateForm">
        <div>
          <input
            type="text"
            className="readOnly"
            readOnly
            value={"作成者 : " + data.boardWriter} />

          <input
            type="text"
            className="readOnly"
            readOnly
            value={"タイトル : " + data.boardTitle} />

          <textarea
            className="contentsInput"
            defaultValue={data.boardContents}
            key={data.boardContents}
            autoFocus
            onChange={saveContents} />

          <button
            className="updateSubmit"
            onClick={ updateData.boardContents === "" ? editFail : edit}>投稿</button>
        </div>
      </form>
    </div>
  )
}