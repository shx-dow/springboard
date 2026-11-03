import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

function Navbar() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [dark, setDark] = useState(
        () => localStorage.getItem("theme") === "dark",
    );

    useEffect(() => {
        document.documentElement.dataset.theme = dark ? "dark" : "light";
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    return (
        <header className="navbar">
            <div>
                <h3>Workspace</h3>
                <p>Manage your projects and issues</p>
            </div>

            <div className="navbar-right">
                <button
                    className="theme-toggle"
                    onClick={() => setDark((value) => !value)}
                    aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
                    title={`Switch to ${dark ? "light" : "dark"} mode`}
                >
                    {dark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <div className="user-info">
                    <div className="avatar">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <span>{user.name || "User"}</span>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
