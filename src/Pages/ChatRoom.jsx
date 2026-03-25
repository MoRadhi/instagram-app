import { onValue, push, ref } from "firebase/database";
import { database } from "../firebase.jsx";
import { useAuth } from "../Auth/AuthProvider";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ChatRoom = () => {
  const { roomId } = useParams();
  const { state } = useLocation();
  const otherUser = state?.otherUser;
  const navigate = useNavigate();
  const currentUser = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const messagesRef = ref(database, `chats/${roomId}`);

  // Load all messages and listen for new ones in real time
  useEffect(() => {
    if (!roomId) return;
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = [];
      snapshot.forEach((child) => {
        data.push({ key: child.key, ...child.val() });
      });
      setMessages(data);
    });
    return () => unsubscribe();
  }, [roomId]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !currentUser) return; // if theres no input nor user return
    await push(messagesRef, {
      text: input.trim(),
      senderUid: currentUser.uid,
      senderName: currentUser.name,
      timestamp: Date.now(),
    });
    setInput(""); //reset input field
  };

  return (
    <div className="chatroom-wrapper">
      <div className="chatroom-header">
        <button className="chatroom-back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="chat-avatar">
          {otherUser?.name?.[0]?.toUpperCase() ?? "?"}
        </div>
        <span className="chatroom-username">{otherUser?.name ?? "Chat"}</span>
      </div>

      <div className="chatroom-messages">
        {messages.length === 0 && (
          <p className="chatroom-empty">No messages yet. Say hello!</p>
        )}
        {messages.map((msg) => {
          const isMine = msg.senderUid === currentUser?.uid;
          return (
            <div
              key={msg.key}
              className={`chatroom-bubble-wrapper ${isMine ? "mine" : "theirs"}`}
            >
              {!isMine && (
                <div className="chatroom-bubble-avatar">
                  {msg.senderName?.[0]?.toUpperCase() ?? "?"}
                </div>
              )}
              <div className={`chatroom-bubble ${isMine ? "mine" : "theirs"}`}>
                {!isMine && (
                  <span className="chatroom-bubble-name">{msg.senderName}</span>
                )}
                <p className="chatroom-bubble-text">{msg.text}</p>
                <span className="chatroom-bubble-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="chatroom-input-row">
        <input
          className="chatroom-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={`Message ${otherUser?.name ?? ""}...`}
        />
        <button
          className="chatroom-send-btn"
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
