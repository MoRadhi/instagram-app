import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase.jsx";
import { useAuth } from "../Auth/AuthProvider";

const Chat = () => {
  const navigate = useNavigate();
  const currentUser = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, "users");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val() ?? {};
      const list = Object.entries(data)
        // Exclude the currently logged-in user
        .filter(([uid]) => uid !== currentUser?.uid)
        .map(([uid, val]) => ({
          uid,
          name: val.name ?? "Unknown",
        }));
      setUsers(list);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleOpen = (otherUser) => {
    // Sort UIDs so the room key is identical no matter who opens the chat
    const roomId = [currentUser.uid, otherUser.uid].sort().join("_");
    navigate(`/chat/${roomId}`, { state: { otherUser } });
  };

  return (
    <div>
      <h2 className="chat-list-header">Messages</h2>
      {users.length === 0 && <p className="chat-empty">No other users yet.</p>}
      {users.map((u) => (
        <div
          key={u.uid}
          className="chat-list-item"
          onClick={() => handleOpen(u)}
        >
          <div className="chat-avatar">{u.name[0].toUpperCase()}</div>
          <div>
            <div className="chat-user-name">{u.name}</div>
            <div className="chat-last-message">Tap to chat</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
