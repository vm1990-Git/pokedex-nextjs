import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import './styles.css'

const Footer = () => {
    return (
        <div className="footer__container">
            <div className='footer__social'> My Social
                <Link target='_blank' href={'https://github.com/vm1990-Git'} className='footer__social__link--github'><FaGithub size={20} /></Link>
                <Link target='_blank' href={'https://www.linkedin.com/in/valentin-miranda-b508a1297/'} className='footer__social__link--linkedin'><FaLinkedin size={20} /></Link>
            </div>
        </div>
    )
}

export default Footer