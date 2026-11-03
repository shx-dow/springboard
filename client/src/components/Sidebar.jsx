import { NavLink, useNavigate } from "react-router-dom";
import {
    SquaresFour,
    Kanban,
    ListChecks,
    SignOut,
} from "@phosphor-icons/react";

function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const links = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: SquaresFour,
        },
        {
            name: "Projects",
            path: "/projects",
            icon: Kanban,
        },
        {
            name: "Issues",
            path: "/issues",
            icon: ListChecks,
        },
    ];

    return (
        <aside className="sidebar">
            <div className="brand">
                <h2>SprintBoard</h2>
            </div>

            <p className="nav-label">WORKSPACE</p>

            <nav>
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            <Icon size={19} />
                            {link.name}
                        </NavLink>
                    );
                })}
            </nav>

            <button className="logout-btn" onClick={logout}>
                <SignOut size={19} />
                Logout
            </button>
        </aside>
    );
}

export default Sidebar;
