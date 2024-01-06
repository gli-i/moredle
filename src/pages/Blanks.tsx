import Header from "../components/Header"
import { NavBar } from "../components/NavBar"

export default function Blanks(){

    return (
        <div>
            <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
            <Header />
            <h1>BLANKS! Coming soon :{')'}</h1>
        </div>
    )
}