import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./login.css"

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onIdHandler = (e) => {
    setId(e.target.value);
  }
  const onPwHandler = (e) => {
    setPassword(e.target.value);
  }
  const submitHandler = (e) => {
    e.preventDefault();
  }

  const loginData = {
    memberID: id,
    memberPassword: password
  }
  const login = () => {
    axios
      .post("http://localhost:8080/api/member/login", loginData)
      .then(res => {
        if (res.data.memberID === id && res.data.memberPassword === password) {
          sessionStorage.setItem("memberID", res.data.memberID);
          sessionStorage.setItem("memberPassword", res.data.memberPassword);
          navigate("/", {replace: true});
        } else {
          alert("アイディ或いはパスワードをご確認ください。");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="login">
      <span className="loginTitle">ログイン</span>
      <form className="loginForm" onSubmit={submitHandler}>
        <label>アイディ</label>
        <input
          type="text"
          className="loginInput"
          placeholder="アイディを入力してください。"
          autoFocus={true}
          value={id}
          onChange={onIdHandler} />

        <label>パスワード</label>
        <input
          type="password"
          className="loginInput"
          placeholder="パスワードを入力してください。"
          value={password}
          onChange={onPwHandler} />

        <button
          className="loginButton"
          onClick={login}>ログイン</button>
      </form>
    </div>
  )
}