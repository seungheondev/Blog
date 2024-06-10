import TopBar from "./pages/topBar/TopBar";
import Header from "./pages/header/Header";
import Login from "./pages/login/Login";
import Write from "./pages/write/Write";
import PostDetail from "./pages/postDetail/PostDetail";
import PostEdit from "./pages/postEdit/PostEdit";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Header />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/post/:id" element={<PostDetail />} />
        <Route exact path="/post/edit/:id" element={<PostEdit />} />
        <Route exact path="/write" element={<Write />} />
      </Routes>
    </Router>
  );
}

export default App;