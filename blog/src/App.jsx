import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Edit from "./pages/Edit.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 홈(목록) */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* 새 글 작성 */}
        <Route
          path="/create"
          element={<Create />}
        />

        {/* 수정/삭제 */}
        <Route
          path="/edit/:id"
          element={<Edit />}
        />
      </Routes>
    </Router>
  );
}

export default App;
