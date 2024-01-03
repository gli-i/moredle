/*
Code modified from https://github.com/Rinasham/sidebar-TypeScript-React/tree/main/
*/
import { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from '../firebase';

type navBarProps = {
  pageWrapId: string;
  outerContainerId: string;
};

export const NavBar = ({ pageWrapId, outerContainerId }: navBarProps) => {
  const navigate = useNavigate();

  const [curUser, setCurUser] = useState<User | null>(null);

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful
            navigate("/");
            setCurUser(null);
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened
        });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setCurUser(user);
            } else {
              // User is signed out
              console.log("user is logged out");
            }
          });
         
    }, [])

  return (
      <Menu>
        <Link className="text-black text-xl font-bold hover:text-green-600 mb-8 transition-all" to={"/"}>Home</Link>
        <Link className="text-black text-xl font-bold hover:text-green-600 mb-8 transition-all" to={"/howtoplay"}>How To Play</Link>
        <Link className="text-black text-xl font-bold hover:text-green-600 mb-8 transition-all" to={"/classic"}>Classic</Link>
        <Link className="text-black text-xl font-bold hover:text-green-600 mb-8 transition-all" to={"/timed"}>Timed Mode</Link>
        <Link className="text-black text-xl font-bold hover:text-green-600 transition-all" to={"/stats"}>Player Stats</Link>

        { !curUser && 
          <div className="user-border">
            <Link className="menu-item user-section" to={"/login"}>Login</Link>
            <Link className="menu-item user-section" to={"/sign-up"}>Sign up</Link>
          </div>
        }

        { curUser &&
          <div className="user-border">
              <div className="menu-item user-section">{curUser.email}</div>
              <button onClick={handleLogout} className="menu-item user-section">Logout</button>
          </div>
        }

      </Menu>
  );
};
