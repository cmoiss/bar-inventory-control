import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <div className="text-white font-outfit">
                <div className="h-svh flex bg-piano-black">
                    <Sidebar />
                    <div className='h-svh flex flex-col grow bg-chromaphobic-black items-center p-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}