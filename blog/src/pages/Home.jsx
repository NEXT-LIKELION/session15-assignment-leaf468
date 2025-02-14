import { Link } from "react-router-dom";

function Home({ posts }) {
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
