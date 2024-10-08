import React, { useEffect, useState } from 'react'
import logo from '../assets/images/minimalistEcommerceIcon.png'
import { Link, NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useShoppingCart } from '../context/ShoppingCartContext'
import Search from './Search'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { openCart, cartQuantity } = useShoppingCart()

  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsVisible(scrollY > currentScrollY || currentScrollY < 80);
    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  const activeStyles = {
    color: "#161616"
  }
  return (
    <header className={` fixed z-40 bg-white w-full px-2 py-3 lg:px-14 flex justify-between items-center duration-500 ease-in-out ${isVisible ? 'top-0' : '-top-40'}`}>
      <nav className='grid grid-flow-col gap-3 lg:gap-5 items-center text-xl'>
        <Link to='/' className='logo-header w-12 sm:w-16 mr-2'>
          <img src={logo} alt="logo" />
        </Link>
        <NavLink
          to='categories'
          className='text-gray-500 hover:text-black hidden md:block'
          style={({ isActive }) => isActive ? activeStyles : null}
        >
          CATEGORIES
        </NavLink>
        <NavLink
          to='about'
          className='text-gray-500 hover:text-black hidden md:block'
          style={({ isActive }) => isActive ? activeStyles : null}
        >
          ABOUT
        </NavLink>
        <NavLink
          to='contact'
          className='text-gray-500 hover:text-black hidden md:block'
          style={({ isActive }) => isActive ? activeStyles : null}
        >
          CONTACT US
        </NavLink>
      </nav>

      {/* MOBILE NAV */}
      <nav className={`fixed z-40 inset-0 bg-white flex-col justify-center gap-3 items-center text-xl ${isOpen ? 'flex' : 'hidden'}`}>
        <NavLink
          to='categories'
          className='text-gray-500 hover:text-black'
          style={({ isActive }) => isActive ? activeStyles : null}
          onClick={() => setIsOpen(false)}
        >
          CATEGORIES
        </NavLink>
        <NavLink
          to='about'
          className='text-gray-500 hover:text-black'
          style={({ isActive }) => isActive ? activeStyles : null}
          onClick={() => setIsOpen(false)}
        >
          ABOUT
        </NavLink>
        <NavLink
          to='contact'
          className='text-gray-500 hover:text-black'
          style={({ isActive }) => isActive ? activeStyles : null}
          onClick={() => setIsOpen(false)}
        >
          CONTACT US
        </NavLink>
      </nav>

      <div
        onClick={() => setIsOpen(prev => !prev)}
        className='fixed right-5 bottom-5 z-40 text-xl bg-gray-200 w-12 h-12 flex justify-center items-center rounded-full hover:bg-gray-300 duration-300 cursor-pointer md:hidden'
      >
        {isOpen
          ? <FontAwesomeIcon icon={faXmark} />
          : <FontAwesomeIcon icon={faBars} />}
      </div>

      <div className='w-full md:w-auto flex justify-end items-center gap-2 md:gap-5'>
        <Search />
        <div
          className='relative text-xl bg-gray-200 min-w-12 h-12 flex justify-center items-center rounded-full hover:bg-gray-300 duration-300 cursor-pointer'
          onClick={openCart}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          {cartQuantity > 0 && (
            <div className='absolute rounded-full bottom-[-4px] right-[-4px] bg-red-600 w-5 h-5 flex justify-center items-center text-white text-xs'>{cartQuantity}</div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header