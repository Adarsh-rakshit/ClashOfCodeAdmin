import React from 'react'
import Container from "../container/Container.jsx"
import Logo from "../Logo.jsx"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn.jsx'

const HeaderBar = () => {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();
    const NavItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Add-Contests",
            slug: "/addcontest",
            active: authStatus
        },
        {
            name: "Add Organisation",
            slug: "/addorg",
            active: authStatus
        }
    ];

    return (
        <header className="shadow mb-3">
                <nav className='flex '>
                    <ul className='flex mt-2 mx-2'>
                        {NavItems.map((item)=> item.active ? (
                            <li key={item.name}>
                                <button onClick={() => navigate(item.slug)} className=' mx-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
                                    {item.name}
                                </button>
                            </li>
                        ): null)}
                        <LogoutBtn/>
                    </ul>
                </nav>
        </header>
    );
}

export default HeaderBar;
