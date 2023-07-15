import { NavLink } from "react-router-dom"

const Navbar = () => {
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
                            <li><NavLink to="/wishlist" className="text-lg">Wishlist</NavLink></li>
                            <li><NavLink to="/contact" className="text-lg">Contact</NavLink></li>
                        </ul>
                    </div>
                    <NavLink to="/" className="btn btn-ghost normal-case text-xl">daisyUI</NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/books" className="text-lg">Books</NavLink></li>
                        <li><NavLink to="/wishlist" className="text-lg">Wishlist</NavLink></li>
                        <li><NavLink to="/contact" className="text-lg">Contact</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-active btn-primary text-neutral-content font-extrabold">Sign Up</a>
                </div>
            </div>
        </>
    )
}

export default Navbar