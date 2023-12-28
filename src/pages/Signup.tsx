import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header"
import { NavBar } from "../components/NavBar"

export default function Signup(){
    const navigate = useNavigate()
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 

    const [requestState, setRequestState] = useState({status: 'ok', visible: false,  message: ''}); 

    async function signUpRequest(){
        try {
            const res = await fetch('https://0indrq4mb3.execute-api.us-east-1.amazonaws.com/Prod/signup', {
                method: "POST",
                body: JSON.stringify({
                    _id: username,
                    password: password                        
                }), 
                credentials: "include"
            });
            //const jsonRes = await res.json(); 

            if (res.ok){
                navigate("/"); 
            }

        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(()=>{
        if (requestState.visible === true){
            setTimeout(()=>{
                setRequestState({status: 'ok', visible: false, message: ''})
            }, 3000); 
        }
    }, [requestState])

    return (
        <> 
            <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

            <Header />

            <div className='h-screen flex justify-center items-start py-[10vh]'>

                <div className={'w-[40vw] border-2 border-gray-300 rounded flex flex-col justify-center align-center font-sans gap-2 p-8'}>

                    <h1 className={'text-center text-4xl font-bold'} >Join us!</h1>

                    <label className={'text-lg py-0.5'}>Username</label>
                    <input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" className={'h-8 border rounded border-gray-500 p-2'}/>

                    <label className={'text-lg py-0.5'}>Password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="text" className={'h-8 border rounded border-gray-500 p-2'}/>

                    <button onClick={signUpRequest} type="button" className={'h-10 border rounded border-black bg-black text-white'}>Sign up</button>

                    <label className={'text-center text-[18px] mt-4'}>Already a member?   
                        <Link to={'/login'} className='text-blue-500'> Log in! </Link>
                    </label>

                </div>

            </div>
        </>
    )
}

