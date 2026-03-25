import { useState } from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

// Build a stable post ID from either a Firebase post or a NYT article
const getPostId = (article) =>
  article.firebaseKey ?? article.uri?.slice(14) ?? article.uri;

const ArticleCard = ({ article, onClick }) => {
  const [showComments, setShowComments] = useState(false);
  const postId = getPostId(article);

  // User-generated posts show authorName; NYT articles show byline
  const authorLabel = article.authorName
    ? article.authorName
    : (article.byline ?? "Unknown");

  const avatarChar = article.authorName
    ? article.authorName[0]
    : (article.section?.[0] ?? "N");

  return (
    <div className="article-card">
      {/* Clickable area for navigation */}
      <div className="article-card-clickable" onClick={onClick}>
        <div className="article-card-header">
          <div className="article-card-avatar">{avatarChar}</div>
          <div>
            <div className="article-card-source">{authorLabel}</div>
            <div className="article-card-date">
              {new Date(article.published_date).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="article-card-image">
          <img
            src={article.multimedia?.[0]?.url ?? article.imageUrl}
            alt={article.title}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <div className="article-card-body">
          <h3 className="article-card-title">{article.title}</h3>
          <p className="article-card-description">{article.abstract}</p>
        </div>
      </div>

      {/* Actions row — outside clickable area */}
      <div
        className="article-card-actions"
        onClick={(e) => e.stopPropagation()}
      >
        <LikeButton postId={postId} />
        <button
          className="comment-toggle-btn"
          onClick={() => setShowComments((v) => !v)}
        >
          💬 {showComments ? "Hide" : "Comment"}
        </button>
      </div>

      {showComments && <CommentSection postId={postId} />}
    </div>
  );
};

export default ArticleCard;
