import { getSessionUser } from "@/lib/api/apiutil";
import TopNavClient from "./TopNavClient";
import { redirect } from "next/navigation";

export default async function TopNav(){
    const user = await getSessionUser() ;
    if(user == null) return redirect("/auth/login");
    return (<>
    
        <TopNavClient user={user}/>
    </>)
}