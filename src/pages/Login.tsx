import { useState, useContext } from "react"  
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar"
import Header from "../components/Header";

import { GlobalContext, GlobalStateType }  from '../globalState'

export default function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const data = useContext<GlobalStateType>(GlobalContext);
   

    async function sendLoginRequest(){
        try {
            const res = await fetch('https://0indrq4mb3.execute-api.us-east-1.amazonaws.com/Prod/signin', {
                method: "POST",
                body: JSON.stringify({_id: username, password: password}),
                credentials: "include"
            });
            const resJson = await res.json();

            if (res.ok){
                if (resJson.admin) data.setIsAdmin(true); 
                navigate('/')
            }
            else{
                // mock
      
                throw new Error("bad request"); 
            }
        } catch (error) {
            navigate('/')
            console.log(error); 
        }
    }

    return (
        <> 
            <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

            <Header />

            <div className='h-screen flex justify-center items-start py-[10vh]'>

                <div className={'w-[40vw] border-2 border-gray-300 rounded flex flex-col justify-center align-center font-sans gap-2 p-8'}>

                    <h1 className={'text-center text-4xl font-bold'} >Welcome back!</h1>

                    <label className={'text-lg py-0.5'}>Username</label>
                    <input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" className={'h-8 border rounded border-gray-500 p-2'}/>

                    <label className={'text-lg py-0.5'}>Password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="text" className={'h-8 border rounded border-gray-500 p-2'}/>

                    <button onClick={sendLoginRequest} type="button" className={'h-10 border rounded border-black bg-black text-white'}>Log in</button>

                    <label className={'text-center text-[18px] mt-4'}> Not a member?   
                        <Link to={'/sign-up'} className='text-blue-500'> Sign up! </Link>
                    </label>

                </div>

            </div>
        </>
    )
}