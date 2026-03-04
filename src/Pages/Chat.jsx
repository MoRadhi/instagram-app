import { useNavigate } from "react-router-dom";

const fakeUsers = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
  },
  {
    id: "2",
    name: "Sarah Chen",
    lastMessage: "Did you see the news?",
  },
  {
    id: "3",
    name: "Mark Williams",
    lastMessage: "Lets catch up soon!",
  },
];

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="chat-list-header">Messages</h2>
      {fakeUsers.map((user) => (
        <div
          key={user.id}
          className="chat-list-item"
          onClick={() => navigate(`/chat/${user.id}`, { state: { user } })}
        >
          <div className="chat-avatar">{user.name[0]}</div>
          <div>
            <div className="chat-user-name">{user.name}</div>
            <div className="chat-last-message">{user.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
