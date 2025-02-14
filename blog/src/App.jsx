import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Edit from "./pages/Edit.jsx";
import "./App.css";

function App() {
  // ---------------------------
  // 전역에서 관리할 게시글 목록 (메모리상에서만 보존)
  // ---------------------------
  const [posts, setPosts] = useState([
    // 예시 데이터 (앱 실행 시점에만 존재)
    { id: 1, title: "첫 번째 글", content: "안녕하세요!" },
    { id: 2, title: "두 번째 글", content: "Firestore 실습 중" },
  ]);

  // ---------------------------
  // CRUD Helper 함수들
  // ---------------------------
  // 1) 새 글 등록
  const createPost = (title, content) => {
    // 임시로 id는 Date.now() 사용
    const newId = Date.now();
    const newPost = { id: newId, title, content };
    setPosts([...posts, newPost]);
  };

  // 2) 글 수정
  const updatePost = (id, newTitle, newContent) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, title: newTitle, content: newContent } : p
    );
    setPosts(updated);
  };

  // 3) 글 삭제
  const deletePost = (id) => {
    const filtered = posts.filter((p) => p.id !== id);
    setPosts(filtered);
  };

  return (
    <Router>
      <Routes>
        {/* 홈(목록) */}
        <Route
          path="/"
          element={<Home posts={posts} />}
        />

        {/* 새 글 작성 */}
        <Route
          path="/create"
          element={<Create createPost={createPost} />}
        />

        {/* 수정/삭제 */}
        <Route
          path="/edit/:id"
          element={<Edit posts={posts} updatePost={updatePost} deletePost={deletePost} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
