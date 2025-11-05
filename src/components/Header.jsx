import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { Netflix_Logo, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { lang } from "../utils/languageConstants";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store) => store.config.lang);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGPTSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/errorPage");
      });
  };

  return (
    <div className="z-50 fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.75)] text-white flex items-center justify-between px-0 sm:px-12 py-0">
      {/* Logo */}
      <div className="bg-black flex items-center justify-between w-screen sm:w-auto">
        <img
          className="w-28 sm:w-36 md:w-44 cursor-pointer"
          src={Netflix_Logo}
          alt="Netflix Logo"
          onClick={() => navigate("/browse")}
        />

        {/* Hamburger icon (mobile only) */}
        {user && (
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Desktop Menu */}
      {user && (
        <div className="hidden sm:flex items-center gap-4">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="p-2 bg-gray-900 text-white rounded-md text-sm sm:text-base"
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGPTSearchClick}
            className="p-2 px-4 bg-purple-800 hover:bg-purple-700 text-white rounded-md transition text-sm sm:text-base"
          >
            {showGptSearch ? lang[langKey].gptBtnHome : "GPT Search"}
          </button>

          <img
            src={user?.photoURL}
            alt="User"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover"
          />

          <button
            onClick={handleSignOut}
            className="text-xs sm:text-sm hover:underline"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Mobile Menu (slide-down) */}
      {isMenuOpen && user && (
        <div className="absolute top-11 left-0 w-full bg-[rgba(0,0,0,0.9)] flex flex-col items-center gap-4 py-14 sm:hidden animate-slideDown">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="p-2 bg-gray-900 text-white rounded-md text-sm w-2/5"
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGPTSearchClick}
            className="p-2 px-4 bg-purple-800 hover:bg-purple-700 text-white rounded-md transition w-2/5 text-sm"
          >
            {showGptSearch ? lang[langKey].gptBtnHome : "GPT Search"}
          </button>

          <img
            src={user?.photoURL}
            alt="User"
            className="w-10 h-10 rounded-md object-cover"
          />

          <button
            onClick={handleSignOut}
            className="text-sm hover:underline border-2 border-white p-2"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
