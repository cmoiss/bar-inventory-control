import React from "react";
import { Link } from "react-router-dom";

interface SidebarListItemLinkProps {
    path: string;
    item: React.ReactNode;
    iconClass: string;
}

export default function SidebarListItemLink({ path, item, iconClass }: SidebarListItemLinkProps) {
    return (
        <div className="w-full h-16 hover:bg-governor-bay flex flex-col justify-center pl-6">
            <li className="h-full">
                <Link to={path}>
                    <span className="flex gap-10 items-center text-xl h-full">
                        <i className={`${iconClass}`}></i>
                        <span className="font-normal">{item}</span>
                    </span>
                </Link>
            </li>
        </div>
    );
}
