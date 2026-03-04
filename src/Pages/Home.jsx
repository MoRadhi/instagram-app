import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    try {
      fetch(
        `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`,
      )
        .then((response) => response.json())
        .then((data) => setArticles(data.articles));
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <div
          key={article.id}
          onClick={() =>
            navigate(`/post/${article.id}`, { state: { article } })
          }
        >
          <h1>{article.title}</h1>
          <img src={article.image} alt={article.title} />
          <h2>{article.description}</h2>
        </div>
      ))}
    </div>
  );
};

export default Home;
