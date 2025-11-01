import { useNavigate } from "react-router-dom";
import {auth} from "../utils/firebase"
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate()
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      navigate("/errorPage");
    });
  }
  return (
    <div className="absolute top-0 left-0 w-screen bg-[rgba(0,0,0,0.6)] px-12 py-4 flex justify-between">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />
      {user && (
      <div className="flex p-2">
        <img src={user?.photoURL} alt="" width="40px" height="40px" />
        <button className="px-2.5" onClick={handleSignOut}>Sign Out</button>
      </div>)
      }
    </div>
  );
};

export default Header;
