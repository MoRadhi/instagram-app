import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Components/Router";
import AuthForm from "./Auth/AuthForm.jsx";
import { useAuth } from "./Auth/AuthProvider.jsx";

function App() {
  const user = useAuth();

  if (user === undefined) return <p>Loading...</p>;
  return (
    <>
      <h1 className="app-title">Daily News Feed</h1>
      <div>{user ? <RouterProvider router={router} /> : <AuthForm />}</div>
    </>
  );
}

export default App;
