import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

function Navbar() {
    const { user, logout } = useAuthContext()
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">SE Blog</a>
            </div>
            <div className="navbar-end ">
                {user ? (<><div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Profile</a></li>
                            <li onClick={() => { logout() }}><a>Logout</a></li>
                        </ul>
                    </div>
                </div></>)
                    : (<div className='flex space-x-4'>
                        <a href="/sign-in" className="btn btn-outline btn-primary">Login</a>
                        <a href="/sign-up" className="btn btn-outline btn-accent">Register</a>
                    </div>)}
            </div>

        </div>
    )
}

export default Navbar