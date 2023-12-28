import { createContext, useState , Dispatch, SetStateAction} from "react" 


export type GlobalStateType = {
    isAdmin: Boolean,
    setIsAdmin: Dispatch<SetStateAction<Boolean>>
}

export const GlobalContext = createContext<GlobalStateType>({isAdmin: false, setIsAdmin: ()=>{}})

export default function GlobalStateProvider({children}: any){
    const [isAdmin, setIsAdmin] = useState<Boolean>(false); 

    return (
        <GlobalContext.Provider value={{isAdmin, setIsAdmin}}>
            {
                children
            }
        </GlobalContext.Provider>
    )
}