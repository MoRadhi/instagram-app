const ArticleCard = ({ article, onClick }) => {
  return (
    <div className="article-card" onClick={onClick}>
      <div className="article-card-header">
        <div className="article-card-avatar">{article.section?.[0] ?? "N"}</div>
        <div>
          <div className="article-card-source">{article.byline}</div>
          <div className="article-card-date">
            {new Date(article.published_date).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="article-card-image">
        <img
          src={article.multimedia?.[0]?.url}
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
  );
};

export default ArticleCard;
