'use client'

import Link from 'next/link'
import React from 'react'
import './styles.css'

const Navbar = () => {
    return (
        <nav className='nav-container'>
            <div className='title-container'>
                <h1>POKEMON</h1>
            </div>
            <ul className='nav-menu'>
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/game'}>Game</Link></li>
                <li><Link href={'/about-us'}>About Us</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
