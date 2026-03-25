import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const MAX_POSTS = 20;

const NewsFeed = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("feedArticles") || "[]");

    try {
      // Fetch NYT articles
      const fetchNYT = fetch(
        `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => data.results ?? [])
        .catch(() => []);

      // Subscribe to Firebase user posts
      const postsRef = ref(database, "posts");
      let nytArticles = [];

      const unsubscribe = onValue(postsRef, async (snapshot) => {
        const userPosts = [];
        snapshot.forEach((child) => {
          userPosts.push({ ...child.val(), firebaseKey: child.key });
        });

        // Only fetch NYT once; re-run when Firebase updates
        if (nytArticles.length === 0) {
          nytArticles = await fetchNYT;
        }

        // User posts first, then NYT, trimmed to MAX_POSTS
        const merged = [...userPosts.reverse(), ...nytArticles].slice(
          0,
          MAX_POSTS,
        );
        setArticles(merged);
        localStorage.setItem("feedArticles", JSON.stringify(merged, ...saved));
      });

      return () => unsubscribe();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  // Build a stable key regardless of post origin
  const getKey = (article) =>
    article.firebaseKey ?? article.uri?.slice(14) ?? Math.random().toString();

  const getPostId = (article) => article.firebaseKey ?? article.uri?.slice(14);

  return (
    <div className="page">
      {articles.map((article) => (
        <ArticleCard
          key={getKey(article)}
          article={article}
          onClick={() =>
            navigate(`/post/${getPostId(article)}`, { state: { article } })
          }
        />
      ))}
    </div>
  );
};

export default NewsFeed;
