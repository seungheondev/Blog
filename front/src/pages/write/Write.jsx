import { useState, useRef} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./write.css"

export default function Write() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [file, setFile] = useState("");
  const fileRef = useRef();
  const navigate = useNavigate();

  const saveTitle = (e) => {
    setTitle(e.target.value);
  }
  const saveContents = (e) => {
    setContents(e.target.value);
  }
  const fileUpload = (e) => {
    setFile(e.target.files[0]);
  }

  const formData = new FormData();
  const data = {
    boardWriter: sessionStorage.getItem("memberID"),
    boardTitle: title,
    boardContents: contents,
  }
  formData.append("data", JSON.stringify(data));
  formData.append("boardFile", file);

  const write = () => {
    axios
      .post("http://localhost:8080/api/board/write", formData, {
        headers : {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(err => console.log(err));
    navigate("/", {replace: true});
  }
  const writeFail = (e) => {
    e.preventDefault();
    alert("タイトル或いはファイル、内容を入力してください。")
  }

  return (
    <div className="write">
      <form
        className="writeForm"
        encType="multipart/form-data">
        <div>
          <input
            type="text"
            className="w_tInput"
            readOnly
            value={"作成者 : " + sessionStorage.getItem("memberID")} />
            
          <input
            type="text"
            className="w_tInput"
            placeholder="タイトルを入力してください。"
            autoFocus
            value={title}
            onChange={saveTitle} />

          <input
            type="file"
            className="fileInput"
            ref={fileRef}
            name="inputFile"
            accept="image/*"
            onChange={fileUpload} />

          <textarea
            className="contentsInput"
            placeholder="内容を入力してください。"
            value={contents}
            onChange={saveContents} />

          <button
            className="writeSubmit"
            onClick={data.boardTitle === "" ||
                     data.boardContents === "" ||
                     fileRef.current.value === "" ?
                     writeFail : write}>投稿</button>
        </div>
      </form>
    </div>
  )
}