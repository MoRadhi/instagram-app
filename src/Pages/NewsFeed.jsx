import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";

const MAX_POSTS = 20;

const NewsFeed = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("feedArticles") || "[]");

    try {
      fetch(
        `https://gnews.io/api/v4/top-headlines?category=world&lang=en&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`,
      )
        .then((response) => response.json())
        .then((data) => {
          const merged = [...data.articles, ...saved];
          const trimmed = merged.slice(0, MAX_POSTS); //Getting latest 20 posts
          setArticles(trimmed);
          localStorage.setItem("feedArticles", JSON.stringify(trimmed)); //Saving posts to local storage
        });
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

export default NewsFeed;
