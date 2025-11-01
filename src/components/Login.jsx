
import React, { useRef, useState } from 'react';
import Header from './Header';
import authFormValidation from '../utils/authFormValidation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmitData = () => {

    const isAuthMsg = authFormValidation(!isSignInForm ? name.current.value : "Default Name", email.current.value, password.current.value);
    setErrorMsg(isAuthMsg)
    if (isAuthMsg) return;

    //Sign Up/In Logic
    if (!isSignInForm) {
      //Sign Up Logic 

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://cdn-icons-png.flaticon.com/512/5045/5045878.png"
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
            navigate("/browse")
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg(errorCode + "-" + errorMessage)
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage)
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage)
        });
    }

  }


  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div className="relative">
      <Header />
      <img className='w-screen h-screen bg-[linear-gradient(to_bottom,#4f1111_0%,#3d0000_16.7%,#280505_40%,#1b0707_100%)]' src="https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/IN-en-20251020-TRIFECTA-perspective_d6da84e9-6145-4b1e-bb51-e402c966a045_large.jpg" alt="bg_img" />
      <hr className="absolute top-[13%] left-0 w-full border-t-2 border-white opacity-20" />

      {/* Centered login form */}
      <div className="absolute inset-0 flex justify-center items-center">
        <form onSubmit={(e) => e.preventDefault()} className="bg-[rgba(0,0,0,0.65)] p-12 rounded-md flex flex-col items-start shadow-lg">
          <h2 className="text-2xl text-white mb-6 font-semibold">Sign {isSignInForm ? "In" : "Up"}</h2>
          {!isSignInForm && <input
            type="text"
            placeholder="Enter Name"
            className="p-3 mb-4 w-72 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            ref={name}
          />}
          <input
            type="text"
            placeholder="Enter Email"
            className="p-3 mb-4 w-72 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            ref={email}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="p-3 mb-6 w-72 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            ref={password}
          />
          <p className='text-red-500 pb-2 self-center'>{errorMsg}</p>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded w-72 transition-colors"
            onClick={handleSubmitData}
          >
            Sign {isSignInForm ? "In" : "Up"}
          </button>
          <p className='text-white mt-4 cursor-pointer' onClick={toogleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now" : "Already to Netflix? Log In now"}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
