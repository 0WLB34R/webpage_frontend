import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import bcblogo from '../BCBLogo.png'

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                <img src={bcblogo} alt='logo' className='navbar-icon'/>
              BCB
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home Test
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/articulos'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Artículos
                </Link>
              </li>
              {localStorage.getItem('name').length !== 0 ? 
                <li className='nav-item'>
                  <Link
                    to='/login'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                  {localStorage.getItem('name') + " " + localStorage.getItem('lastnm')}<br></br>
                  </Link>
                </li> :
                <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Iniciar sesión
                </Link>
              </li> 
              }
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
