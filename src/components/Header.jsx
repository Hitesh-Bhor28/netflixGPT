import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from '../utils/userSlice'
import { Netflix_Logo } from "../utils/constants";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser())
        navigate("/");
      }
    });

    return ()=> unsubscribe();
  }, [])
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/errorPage");
    });
  }
  return (
    <div className="z-50 absolute top-0 left-0 w-screen text-white bg-[rgba(0,0,0,0.6)] px-12 py-4 flex justify-between">
      <img
        className="w-44"
        src={Netflix_Logo}
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
