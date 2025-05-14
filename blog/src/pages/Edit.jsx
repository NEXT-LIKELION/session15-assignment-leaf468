import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodoById, updateTodo, deleteTodo } from "../lib/firebase";

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(true);

    // Firestore에서 할 일 데이터 가져오기
    useEffect(() => {
        const fetchTodo = async () => {
            const todo = await getTodoById(id);
            if (!todo) {
                alert("해당 할 일이 존재하지 않습니다.");
                navigate("/");
                return;
            }
            setTitle(todo.title);
            setDetails(todo.details || "");
            // Firestore에서 Timestamp로 저장된 날짜를 YYYY-MM-DD 형식으로 변환
            if (todo.dueDate) {
                const date = todo.dueDate instanceof Date
                    ? todo.dueDate
                    : todo.dueDate.toDate ? todo.dueDate.toDate() : new Date(todo.dueDate);

                setDueDate(date.toISOString().split('T')[0]);
            } else {
                setDueDate("");
            }
            setLoading(false);
        };
        fetchTodo();
    }, [id, navigate]);

    // 기존 handleUpdate 함수는 handleSubmit으로 대체되어 제거됨

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            await deleteTodo(id);
            alert("할 일이 삭제되었습니다.");
            navigate("/");
        }
    };

    // 오늘 날짜를 YYYY-MM-DD 형식으로 구하기
    const today = new Date().toISOString().split('T')[0];

    if (loading) {
        return <div className="loading">불러오는 중...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("제목을 입력하세요.");
            return;
        }
        await updateTodo(id, title, details, dueDate);
        alert("할 일이 수정되었습니다.");
        navigate("/");
    };

    return (
        <div className="container">
            <h1 className="title">할 일 수정</h1>
            <form onSubmit={handleSubmit} className="form">
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
                <div className="actions">
                    <button type="submit" className="btn btn-primary">
                        수정하기
                    </button>
                    <button type="button" onClick={handleDelete} className="btn btn-delete">
                        삭제하기
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="btn btn-secondary"
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
