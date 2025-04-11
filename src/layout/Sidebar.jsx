import { Link } from "react-router-dom";
import SidebarListItemLink from "../components/SidebarListItemLink";

export default function Sidebar() {
    return (
        <div className="flex flex-col w-64 py-10">
            <aside>
                <ul>
                    <div className="w-full flex flex-col gap-6">
                        <SidebarListItemLink path="/" item="Produtos" iconClass="bi bi-boxes" />
                        <SidebarListItemLink path="/categorias" item="Categorias" iconClass="bi bi-folder" />
                        <SidebarListItemLink path="/variacoes" item="Variações" iconClass="bi bi-grid" />
                    </div>
                </ul>
            </aside>
        </div>
    );
}