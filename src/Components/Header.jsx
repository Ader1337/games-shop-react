import React, { useContext } from 'react'
import { ShopContext } from './../context';
import { Link } from 'react-router-dom';

function Header() {

  const {isCartOpen } = useContext(ShopContext)

  return (
    <div>
      <div className={"container " + (isCartOpen ? 'blur' : '')} >
        <div className="header">
          <Link to='/' className="header__logo">MyProj</Link>
          <nav className="header__nav">
            <a target="_blank" className='header__nav-link' href="https://github.com/Ader1337/games-shop-react">Repository</a>
            <a target="_blank" className='header__nav-link' href="https://github.com/Ader1337">Git Hub</a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header