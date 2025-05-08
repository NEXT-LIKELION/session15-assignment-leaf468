import { Link } from "react-router-dom";
/*import { useEffect, useState } from "react";
import { getPosts } from "../lib/firebase"; // Firestore에서 데이터 가져오기 */

function Home() {
  /*const [posts, setPosts] = useState([]); // 게시글 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postList = await getPosts(); // ✅ Firestore에서 데이터 가져오기
        console.log("📌 Firestore에서 가져온 데이터:", postList); // ✅ Firestore에서 데이터 출력
        setPosts(postList);
      } catch (error) {
        console.error("🔥 Firestore 데이터 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);*/

  return (
    <div className="container">
      <h1 className="title">게시글 목록</h1>

      <div className="actions">
        <Link to="/create">
          <button className="btn">새 글 작성</button>
        </Link>
      </div>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/edit/${post.id}`}>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
