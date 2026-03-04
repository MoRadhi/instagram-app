import { onChildAdded, push, ref, set } from "firebase/database";
import { database, auth } from "../firebase.jsx";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Save the Firebase message folder name as a constant to avoid bugs due to misspelling
  const DB_CHAT_KEY = `chats/${user?.id}`;

  useEffect(() => {
    const messagesRef = ref(database, DB_CHAT_KEY);
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(messagesRef, (data) => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render
      setMessages((prevState) =>
        // Store message key so we can use it as a key in our list items when rendering messages
        [...prevState, { key: data.key, val: data.val() }],
      );
    });
  }, []);

  const sendMessage = () => {
    if (!input) return; // if theres no input return
    const messageListRef = ref(database, DB_CHAT_KEY);
    const newMessageRef = push(messageListRef);
    set(newMessageRef, input);
    setInput(""); //reset input field
  };

  // Convert messages in state to message JSX elements to render
  let messageListItems = messages.map((message) => (
    <li key={message.key}>{message.val}</li>
  ));

  return (
    <div>
      <div className="chatroom-header">
        <button className="chatroom-back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="chat-avatar">{user?.name[0]}</div>
        <span className="chatroom-username">{user?.name}</span>
      </div>
      <div className="chatroom-messages">
        {messages.map((message) => (
          <div key={message.key} className="chatroom-bubble">
            {message.val}
          </div>
        ))}
      </div>
      <div className="chatroom-input-row">
        <input
          className="chatroom-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="chatroom-send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
