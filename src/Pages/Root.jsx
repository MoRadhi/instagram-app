import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Root = () => {
  //useNavigate to navigate to auth when not logged in

  return (
    <div className="root">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
