import { useEffect, useState } from "react";
import { ref, onValue, set, remove } from "firebase/database";
import { database } from "../firebase.jsx";
import { useAuth } from "../Auth/AuthProvider";

const LikeButton = ({ postId }) => {
  const user = useAuth();
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const likesRef = ref(database, `likes/${postId}`);
  const userLikeRef = user
    ? ref(database, `likes/${postId}/${user.uid}`)
    : null;

  useEffect(() => {
    if (!postId) return;
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const data = snapshot.val() ?? {};
      setLikeCount(Object.keys(data).length);
      if (user) setLiked(!!data[user.uid]);
    });
    return () => unsubscribe();
  }, [postId, user]);

  const handleLike = async (e) => {
    e.stopPropagation(); // prevent card click navigation
    if (!user) return;
    if (liked) {
      await remove(userLikeRef);
    } else {
      await set(userLikeRef, { name: user.name, likedAt: Date.now() });
    }
  };

  return (
    <button
      className={`like-btn ${liked ? "liked" : ""}`}
      onClick={handleLike}
      disabled={!user}
      title={user ? (liked ? "Unlike" : "Like") : "Sign in to like"}
    >
      <span className="like-icon">{liked ? "♥" : "♡"}</span>
      <span className="like-count">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
