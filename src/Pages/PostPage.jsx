import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LikeButton from "../Components/LikeButton";
import CommentSection from "../Components/CommentSection";

const getPostId = (article) =>
  article.firebaseKey ?? article.uri?.slice(14) ?? article.uri;

const PostPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!article) {
    return (
      <div className="page">
        <p>Post not found.</p>
        <button className="auth-btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const postId = getPostId(article);
  const authorLabel = article.authorName ?? article.byline ?? "Unknown";

  return (
    <div className="post-page">
      <button className="post-page-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="post-page-image">
        <img
          src={article.multimedia?.[0]?.url ?? article.imageUrl}
          alt={article.title}
        />
      </div>

      <div className="post-page-content">
        <p className="post-page-author">{authorLabel}</p>
        <h1 className="post-page-title">{article.title}</h1>
        <p className="post-page-description">{article.abstract}</p>

        {/* Only NYT articles have an external URL */}
        {article.url && (
          <a
            className="post-page-link"
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            Read full article
          </a>
        )}

        <div className="post-page-actions">
          <LikeButton postId={postId} />
        </div>

        <CommentSection postId={postId} />
      </div>
    </div>
  );
};

export default PostPage;
