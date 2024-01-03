import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';

export default function Header() {

    const navigate = useNavigate();

    const [signedIn, setSignedIn] = useState<boolean>(false);

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.\
            navigate("/");
            setSignedIn(false);
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setSignedIn(true);
            }
          });
         
    }, [])

    return (
        <>
            <div className="w-full flex justify-around gap-10 border-b-2 border-black">
                <div className="flex-1"></div>
                <div className="w-1/4 text-center flex flex-col justify-center text-xl md:text-2xl md:p-1 lg:text-3xl lg:p-3 font-bold">
                    <a href="/">Moredle</a>
                </div>

                { !signedIn &&
                <div className="flex-1 flex items-center justify-end gap-4 mx-4">
                    <Link to={'/sign-up'} className="w-1/4 flex justify-center items-center h-1/2 bg-blue-500 text-white rounded-sm cursor-pointer">Sign up</Link>
                    <Link to={'/login'} className="w-1/4 flex justify-center items-center h-1/2 bg-blue-500 text-white rounded-sm cursor-pointer">Login</Link>
                </div>
                }

                { signedIn &&
                <div className="flex-1 flex items-center justify-end gap-4 mx-4">
                    <button onClick={handleLogout} className="w-1/4 flex justify-center items-center h-1/2 bg-blue-500 text-white rounded-sm cursor-pointer">Logout</button>
                </div>
                }
            </div>
        </>
    )
}