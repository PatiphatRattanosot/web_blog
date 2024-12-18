import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
function Layout() {
    return (
        <div className='min-h-screen flex flex-col bg-gradient from-blue to-purple-600'>
            <header className=''>
                <Navbar></Navbar>
            </header>
            <main className='flex-grow flex item-center justify-center container mac-h-screen mx-auto sm:p-6 lg:p-8'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}

export default Layout