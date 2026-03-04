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
    name: "Jane Williams",
    lastMessage: "Lets catch up soon!",
  },
];

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Messages</h2>
      {fakeUsers.map((user) => (
        <div
          key={user.id}
          onClick={() => navigate(`/chat/${user.id}`, { state: { user } })}
        >
          <h3>{user.name}</h3>
          <p>{user.lastMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
