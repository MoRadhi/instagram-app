import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";

const Home = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    try {
      fetch(
        `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`,
      )
        .then((response) => response.json())
        .then((data) => setArticles(data.results));
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div className="page">
      {articles.map((article) => (
        <ArticleCard
          key={article.uri.slice(14)}
          article={article}
          onClick={() =>
            navigate(`/post/${article.uri.slice(14)}`, { state: { article } })
          }
        />
      ))}
    </div>
  );
};

export default Home;
