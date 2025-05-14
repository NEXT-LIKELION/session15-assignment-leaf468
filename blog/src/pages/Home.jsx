import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../lib/firebase";

function Home() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const todoList = await getTodos();
            console.log("📌 Firestore에서 가져온 할 일 목록:", todoList);
            setTodos(todoList);
        } catch (error) {
            console.error("🔥 Firestore 데이터 불러오기 오류:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();

        if (window.confirm("정말 삭제하시겠습니까?")) {
            await deleteTodo(id);
            fetchData(); // 목록 다시 불러오기
        }
    };

    // 날짜 형식 변환 함수
    const formatDate = (date) => {
        if (!date) return "마감일 없음";
        const d = new Date(date);
        return d.toLocaleDateString();
    };

    return (
        <div className="container">
            <h1 className="title">할 일 목록</h1>

            <div className="actions">
                <Link to="/create">
                    <button className="btn">새로운 할 일 추가</button>
                </Link>
            </div>

            {loading ? (
                <div className="loading">불러오는 중...</div>
            ) : (
                <ul className="todo-list">
                    {todos.length === 0 ? (
                        <p className="no-todos">등록된 할 일이 없습니다.</p>
                    ) : (
                        todos.map((todo) => (
                            <li key={todo.id} className="todo-item">
                                <Link to={`/edit/${todo.id}`} className="todo-content">
                                    <div className="todo-header">
                                        <strong className="todo-title">{todo.title}</strong>
                                        <span className="todo-due-date">마감일: {formatDate(todo.dueDate)}</span>
                                    </div>
                                    <p className="todo-details">{todo.details}</p>
                                </Link>
                                <div className="todo-actions">
                                    <Link to={`/edit/${todo.id}`} className="btn btn-edit">
                                        수정
                                    </Link>
                                    <button
                                        onClick={(e) => handleDelete(todo.id, e)}
                                        className="btn btn-delete"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default Home;
