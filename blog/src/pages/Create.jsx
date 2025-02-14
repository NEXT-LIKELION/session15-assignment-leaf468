import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create({ createPost }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요.");
      return;
    }
    createPost(title, content);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h1 className="form-title">새 글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>내용</label>
          <textarea
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">등록하기</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
