import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, Navigate, useLocation } from "react-router-dom";

export default function SideBar(){
    const NomeUsuario = localStorage.getItem('nomeUsuario');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();


    useEffect(()=>{
        if(localStorage.getItem('token') !== null){
            setIsLoggedIn(true)
        }
    },[location.pathname])
    
    
    function signOut() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    if(isLoggedIn == false){
        return <Navigate to="/signin" replace />;
    }

  return (
    isLoggedIn && (
        <div className="h-screen p-5 bg-slate-400 w-min-full flex flex-col justify-between">
            <div>
            <ul className="flex flex-col gap-5 ">
                <li className="border-b-2 border-slate-500">{NomeUsuario}</li>
                <li className="border-b-2 border-slate-500">Sobre a Empresa</li>
                <li className="border-b-2 border-slate-500">
                    <Link to="/">Dashboard</Link>
                </li>
                <li className="border-b-2 border-slate-500">
                    <Link to="/compras">Compras</Link>
                </li>
            </ul>
            </div>
            
            <Button className=" bottom-2 w-full" onClick={signOut}>
                SignOut
            </Button>
        </div>
        )
    )
}