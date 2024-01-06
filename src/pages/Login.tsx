import { useState } from "react"  
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar"
import Header from "../components/Header";

import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState<string>("");

    async function loginRequest() {
        await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            switch(error.code){
                case "auth/invalid-email":
                    setErrMsg("Please input your email.");
                    break;
                case "auth/missing-password":
                    setErrMsg("Please input your password.");
                    break;
                case "auth/invalid-credential":
                    setErrMsg("Invalid credentials. If you have not created an account, follow the link below to sign up.");
                    break;
                default:
                    setErrMsg(error.code);
            }
        });
    }

    return (
        <> 
            <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

            <Header />

            <div className='h-screen flex justify-center items-start py-[10vh]'>

                <div className={'w-[40vw] border-2 border-gray-300 rounded flex flex-col justify-center align-center font-sans gap-2 p-8'}>

                    <h1 className={'text-center text-4xl font-bold'} >Welcome back!</h1>

                    <label className={'text-lg py-0.5'}>Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="text" className={'h-8 border rounded border-gray-500 p-2'}/>

                    <label className={'text-lg py-0.5'}>Password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className={'h-8 border rounded border-gray-500 p-2'}/>

                    {errMsg && 
                        <div className="mt-3 p-1 border border-red-500 text-red-500">ERROR: {errMsg}</div>
                    }

                    <button onClick={loginRequest} type="button" className={'p-2 mt-3 border rounded border-black bg-black text-white'}>Log in</button>

                    <label className={'text-center text-[18px] mt-4'}> Not a member?   
                        <Link to={'/sign-up'} className='text-blue-500'> Sign up! </Link>
                    </label>

                </div>

            </div>
        </>
    )
}