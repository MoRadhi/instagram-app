import { useNavigate, useLocation } from "react-router-dom";

const PostPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <img src={article.image} alt={article.title} />
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <a href={article.url} target="_blank">
        Read full article
      </a>
    </div>
  );
};

export default PostPage;
