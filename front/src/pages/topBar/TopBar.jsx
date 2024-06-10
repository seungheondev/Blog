import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./topBar.css"

export default function TopBar() {
  const [log, setLog] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logoutHandle = () => {
    sessionStorage.clear();
    setLog(false);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (sessionStorage.getItem("memberID") === null && sessionStorage.getItem("memberPassword") === null) {
      console.log("sessionCheck : Guest");
    } else {
      setLog(true);
    }
  }, [logoutHandle]);

  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://twitter.com/" target="_blank" className="link" rel="noopener noreferrer">
          <i className="topIcon fa-brands fa-square-twitter"></i>
        </a>
        <a href="https://instagram.com/" target="_blank" className="link" rel="noopener noreferrer">
          <i className="topIcon fa-brands fa-square-instagram"></i>
        </a>
        <a href="https://github.com/" target="_blank" className="link" rel="noopener noreferrer">
          <i className="topIcon fa-brands fa-square-github"></i>
        </a>
      </div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">HOME</Link>
          </li>
          <li className="topListItem">
            {log ?
              <Link className="link" to="/write">WRITE</Link> :
              <Link className="link" to="/login">WRITE</Link>
            }
          </li>
          {log ?
            <li className="topListItem">
              <Link className="link" to="/" onClick={logoutHandle}>LOGOUT</Link>
            </li> :
            <li className="topListItem">
              <Link className="link" to="/login">LOGIN</Link>
            </li>
          }
        </ul>
      </div>

      <div className="topRight">
        {sessionStorage.getItem("memberID") === null &&
          sessionStorage.getItem("memberPassword") === null ?
          <input
            className="searchBar"
            type="text"
            readOnly
            value={"ゲスト"} /> :
          <input
            className="searchBar"
            type="text"
            readOnly
            value={sessionStorage.getItem("memberID") + "様"} />
        }
      </div>
    </div>
  )
}