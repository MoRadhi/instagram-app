import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { database } from "../firebase.jsx";
import { useAuth } from "../Auth/AuthProvider";

const Composer = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Guard: must be logged in
  if (!user) {
    return (
      <div className="page composer-guard">
        <p>You must be logged in to create a post.</p>
        <button className="auth-btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const handleSubmit = async () => {
    setError("");
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!abstract.trim()) {
      setError("Description is required.");
      return;
    }

    setSubmitting(true);
    try {
      const post = {
        title: title.trim(),
        abstract: abstract.trim(),
        imageUrl: imageUrl.trim(),
        authorName: user.name,
        authorUid: user.uid,
        published_date: new Date().toISOString(),
        // Shape compatible with ArticleCard
        byline: `By ${user.name}`,
        section: "U", // "U" for user-generated
        uri: `user-post-${Date.now()}`,
        multimedia: imageUrl.trim()
          ? [{ url: imageUrl.trim(), type: "image" }]
          : [],
      };

      await push(ref(database, "posts"), post);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page composer-page">
      <h2 className="composer-title">Create a Post</h2>
      <p className="composer-author">
        Posting as <strong>{user.name}</strong>
      </p>

      <div className="composer-form">
        <label className="composer-label">Title *</label>
        <input
          className="composer-input"
          type="text"
          placeholder="What's the headline?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="composer-label">Description *</label>
        <textarea
          className="composer-textarea"
          placeholder="Tell the story..."
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          rows={5}
        />

        <label className="composer-label">Image URL (optional)</label>
        <input
          className="composer-input"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {imageUrl && (
          <img
            className="composer-preview"
            src={imageUrl}
            alt="Preview"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        {error && <p className="auth-error">{error}</p>}

        <button
          className="auth-btn-primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </div>
  );
};

export default Composer;
