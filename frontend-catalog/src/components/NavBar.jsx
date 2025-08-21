import { useTheme } from "./Theme";
import { Link, useLocation } from "react-router-dom";

export default function NavBar({ onSearch }) {
    const { theme } = useTheme();

    const navbarBgColor = theme === "dark" ? "#EEE5DA" : "#0F9E99";
    const boxColor = theme === "dark" ? "bg-base-200 text-base-content" : "bg-[#EFE9E0] text-black";
    const dropdownBgColor = theme === "dark" ? "bg-base-100" : "bg-[#EFE9E0] text-black";
    const location = useLocation();
    const isCatalogPage = location.pathname === "/catalog";
    const isAdminPage = location.pathname === "/admin";

    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div
            className="navbar p-4 transition-all duration-300"
            style={{ backgroundColor: navbarBgColor }}
        >
            <div className="navbar-start">
                <div
                    className={`text-lg font-bold p-3 rounded-lg ml-16 shadow select-none transition-all duration-300 ${boxColor}`}
                >
                    Thrifting Aldi
                </div>
            </div>
            <div className="navbar-center">
                <div className="form-control select-none">
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={handleSearchChange}
                        className="input input-bordered w-60"
                    />
                </div>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-left mr-10">
                    <div tabIndex={0} role="button" className={`btn m-1 transition-all duration-300 ${boxColor}`}>
                        <svg
                            className="w-6 h-6 transform scale-x-[-1]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h12M4 18h8"></path>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0} className={`dropdown-content menu rounded-box z-[1] w-52 p-2 shadow ring-2 ring-slate-500/50 transition-all duration-300 ${dropdownBgColor}`} >
                        {isCatalogPage && (
                            <li>
                                <a href="#footer">About Us</a>
                            </li>
                        )}
                        {isAdminPage && (
                            <>
                                <li>
                                    <Link to="/catalog">Go to Store Page</Link>
                                </li>
                                <li>
                                    <a>Logout</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
