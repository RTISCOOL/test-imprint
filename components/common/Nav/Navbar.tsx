import { getSessionUser } from "@/lib/api/apiutil";
import NavClient from "./NavClient";

export default async function Navbar(){
    const loggedIn = await getSessionUser() != null;

    return (<>
    
        <NavClient loggedIn={loggedIn}/>
    </>)
}