import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";

const Home = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    try {
      fetch(
        `https://gnews.io/api/v4/top-headlines?category=entertainment&lang=en&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`,
      )
        .then((response) => response.json())
        .then((data) => setArticles(data.articles));
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div className="page">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onClick={() =>
            navigate(`/post/${article.id}`, { state: { article } })
          }
        />
      ))}
    </div>
  );
};

export default Home;
