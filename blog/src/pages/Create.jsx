import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../lib/firebase";

function Create() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("제목을 입력하세요.");
            return;
        }

        await addTodo(title, details, dueDate);
        navigate("/");
    };

    // 오늘 날짜를 YYYY-MM-DD 형식으로 구하기
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="form-container">
            <h1 className="form-title">새로운 할 일 추가</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        placeholder="할 일 제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>세부 사항</label>
                    <textarea
                        placeholder="세부 사항을 입력하세요"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label>마감 기한</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={today}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        추가하기
                    </button>
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate("/")}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Create;
