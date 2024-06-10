import PostList from "../postList/PostList"
import "./header.css"

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitle">React & Spring</span>
        <span className="headerTitleM">BLOG</span>
      </div>
      <img src="image/headerImg.jpg" className="headerImg" alt="" />
      <PostList />
    </div>
  )
}
