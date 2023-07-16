import { NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to="/books" className="text-lg">Books</NavLink></li>

                            <li><NavLink to="/addbook" className="text-lg">Add Book</NavLink></li>
                            <li><NavLink to="/managebook" className="text-lg">Manage Book</NavLink></li>

                            <li><NavLink to="/wishlist" className="text-lg">Wishlist</NavLink></li>
                        </ul>
                    </div>
                    <NavLink to="/">
                        <img className="w-16" src="https://cdn.sanity.io/images/ymxgha9c/production/8b472b6f2818a3dd0242a2434c363e44b6f00ea9-500x500.png?w=1080&q=75&fit=clip&auto=format" alt="logo" />
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/books" className="text-lg">Books</NavLink></li>

                        <li><NavLink to="/addbook" className="text-lg">Add Book</NavLink></li>
                        <li><NavLink to="/managebook" className="text-lg">Manage Book</NavLink></li>

                        <li><NavLink to="/wishlist" className="text-lg">Wishlist</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        isAuthenticated ? <>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.picture} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>{user?.name}</a></li>
                                    <li><a>{user?.email}</a></li>
                                    <li>
                                        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                            : <>
                                <button onClick={() => loginWithRedirect()} className="btn btn-active btn-primary text-neutral-content font-extrabold">Login Now</button>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar