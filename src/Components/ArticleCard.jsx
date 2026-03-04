const ArticleCard = ({ article, onClick }) => {
  return (
    <div className="article-card" onClick={onClick}>
      <div className="article-card-header">
        <div className="article-card-avatar">
          {article.source?.name?.[0] ?? "N"}
        </div>
        <div>
          <div className="article-card-source">{article.source?.name}</div>
          <div className="article-card-date">
            {article?.publishedAt?.slice(0, 10)}
          </div>
        </div>
      </div>
      <div className="article-card-image">
        <img
          src={article.image}
          alt={article.title}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
      <div className="article-card-body">
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-description">{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
