import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const PostPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;

  //Locks post page to not scroll
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="post-page">
      <button className="post-page-back" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="post-page-image">
        <img src={article.multimedia?.[0]?.url} alt={article.title} />
      </div>
      <div className="post-page-content">
        <h1 className="post-page-title">{article.title}</h1>
        <p className="post-page-description">{article.abstract}</p>
        <a className="post-page-link" href={article.url} target="_blank">
          Read full article
        </a>
      </div>
    </div>
  );
};

export default PostPage;
