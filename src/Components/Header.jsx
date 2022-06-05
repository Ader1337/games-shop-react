import React from 'react'

function Header() {
  return (
    <div>
        <div className="container">
            <div className="header">
                <div className="header__logo">MyProj</div>
                <nav className="header__nav">
                    <a className='header__nav-link' href="">Repository</a>
                    <a target="_blank" className='header__nav-link' href="https://github.com/Ader1337">Git Hub</a>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Header