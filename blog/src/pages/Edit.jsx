import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edit({ posts, updatePost, deletePost }) {
  const navigate = useNavigate();
  const { id } = useParams(); // URL의 /edit/:id
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 글 id에 맞는 데이터 찾기
  useEffect(() => {
    const numericId = Number(id);
    const found = posts.find((p) => p.id === numericId);
    if (!found) {
      alert("해당 게시글이 존재하지 않습니다.");
      navigate("/");
      return;
    }
    setTitle(found.title);
    setContent(found.content);
  }, [id, posts, navigate]);

  const handleUpdate = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요.");
      return;
    }
    updatePost(Number(id), title, content);
    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePost(Number(id));
      navigate("/");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">게시글 수정</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            placeholder="제목 입력"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            placeholder="내용 입력"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button onClick={handleUpdate} className="btn">
            수정하기
          </button>
          <button onClick={handleDelete} className="btn btn-delete">
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
