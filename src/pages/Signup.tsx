import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header"
import { NavBar } from "../components/NavBar"

import { auth, createUserData } from '../firebase';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';

export default function Signup(){
    const navigate = useNavigate()
    
    const [email, setEmail] = useState('');
    const [dname, setDname] = useState('');
    const [password, setPassword] = useState(''); 

    const [userCreated, setUserCreated] = useState<boolean>(false);
    const [dataCreated, setDataCreated] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState<string>("");

    async function signUpRequest() {

        if (!dname){
            setErrMsg("Please create a display name.");
            return;
        } else if (!/^[A-Za-z]{3,12}$/.test(dname)){
            setErrMsg("Display name must be between 3 and 12 characters, and only contain letters.")
            return;
        }
       
        await createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            setUserCreated(true);
            createDataRequest();
            
          })
          .catch((error) => {
            //console.log(error.message);

            switch(error.code){
                case "auth/invalid-email":
                    setErrMsg("Please input a valid email.");
                    break;
                case "auth/missing-password":
                    setErrMsg("Please input a password.");
                    break;
                case "auth/weak-password":
                    setErrMsg("Password should be at least 6 characters long.");
                    break;
                case "auth/email-already-in-use":
                    setErrMsg("This email address is already in use. If you have already created an account, follow the link below to log in.");
                    break;
                default:
                    setErrMsg(error.code);
            }
          });
    }

    async function createDataRequest() {
        await createUserData(email, dname, password)
            .then(() => {
                setDataCreated(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
    }    

    useEffect(() => {
        if (userCreated && dataCreated){
            navigate("/login");
        }
    }, [userCreated, dataCreated, navigate])

    return (
        <> 
            <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

            <Header />

            <div className='h-screen flex justify-center items-start py-[10vh]'>

                <div className={'w-[40vw] border-2 border-gray-300 rounded flex flex-col justify-center align-center font-sans gap-2 p-8'}>

                    <h1 className={'text-center text-4xl font-bold'} >Join us!</h1>

                    <label className={'text-lg py-0.5'}>Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="text" className={'h-8 border rounded border-gray-500 p-2'}/>

                    <label className={'text-lg py-0.5'}>Display Name</label>
                    <input onChange={(e)=>{setDname(e.target.value)}} value={dname} type="text" className={'h-8 border rounded border-gray-500 p-2'}/>

                    <label className={'text-lg py-0.5'}>Password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="text" className={'h-8 border rounded border-gray-500 p-2'}/>

                    {errMsg && 
                        <div className="mt-3 p-1 border border-red-500 text-red-500">ERROR: {errMsg}</div>
                    }

                    <button onClick={signUpRequest} type="button" className={'p-2 mt-3 border rounded border-black bg-black text-white'}>Sign up</button>

                    <label className={'text-center text-[18px] mt-4'}>Already a member?   
                        <Link to={'/login'} className='text-blue-500'> Log in! </Link>
                    </label>

                </div>

            </div>
        </>
    )
}

