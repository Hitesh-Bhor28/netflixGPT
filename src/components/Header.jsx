import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from '../utils/userSlice'
import { Netflix_Logo, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { lang } from "../utils/languageConstants";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store)=> store.config.lang)
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

    return () => unsubscribe();
  }, [])

  const handleGPTSearchClick = () => {
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

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
          {showGptSearch && (
            <select onChange={handleLanguageChange} className="p-2 m-2 bg-gray-900 text-white">
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button onClick={handleGPTSearchClick} className="p-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg">{showGptSearch ? lang[langKey].gptBtnHome : "GPT Search"}</button>
          <img src={user?.photoURL} alt="" width="40px" height="40px" />
          <button className="px-2.5" onClick={handleSignOut}>Sign Out</button>
        </div>)
      }
    </div>
  );
};

export default Header;
