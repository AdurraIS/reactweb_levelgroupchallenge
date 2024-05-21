import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RxAvatar } from "react-icons/rx";

export default function SideBar() {
    const NomeUsuario = localStorage.getItem('nomeUsuario');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();


    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsLoggedIn(true)
        }
    }, [location.pathname])


    function signOut() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    if (isLoggedIn == false && location.pathname !== "/signup" && location.pathname !== "/signin") {
        return <Navigate to="/signin" replace />;
    }

    return (
        isLoggedIn && (
            <div className="h-screen p-5 bg-gray-30 w-[15vw] w-max-full flex flex-col justify-between">
                <div>
                    <ul className="flex flex-col gap-3 ">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex flex-row items-center gap-1 text-start  border-b-2 text-orange-500 border-orange-500">
                            <RxAvatar size="20px" />{NomeUsuario}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <li>Sobre a Empresa</li>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
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
