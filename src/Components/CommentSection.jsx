import { useEffect, useState } from "react";
import { ref, push, onValue } from "firebase/database";
import { database } from "../firebase.jsx";
import { useAuth } from "../Auth/AuthProvider";

const CommentSection = ({ postId }) => {
  const user = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const commentsRef = ref(database, `comments/${postId}`);

  useEffect(() => {
    if (!postId) return;
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = [];
      snapshot.forEach((child) => {
        data.push({ id: child.key, ...child.val() });
      });
      setComments(data);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.stopPropagation();
    if (!text.trim() || !user) return;
    setSubmitting(true);
    try {
      await push(commentsRef, {
        text: text.trim(),
        authorName: user.name,
        authorUid: user.uid,
        createdAt: Date.now(),
      });
      setText("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comment-section" onClick={(e) => e.stopPropagation()}>
      <h4 className="comment-section-title">Comments ({comments.length})</h4>

      <div className="comment-list">
        {comments.length === 0 && (
          <p className="comment-empty">No comments yet. Be the first!</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <span className="comment-avatar">{c.authorName?.[0] ?? "?"}</span>
            <div className="comment-body">
              <span className="comment-author">{c.authorName}</span>
              <p className="comment-text">{c.text}</p>
              <span className="comment-time">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {user ? (
        <div className="comment-input-row">
          <input
            className="comment-input"
            type="text"
            placeholder={`Comment as ${user.name}...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
          <button
            className="comment-submit"
            onClick={handleSubmit}
            disabled={submitting || !text.trim()}
          >
            Post
          </button>
        </div>
      ) : (
        <p className="comment-empty">Sign in to leave a comment.</p>
      )}
    </div>
  );
};

export default CommentSection;
