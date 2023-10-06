'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const {status, data} = useSession();
  const handleLoginClick = () => signIn();
  const handleLogoutClick = () => {
    setMenuIsOpen(false);
    signOut();
  }
  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  return (
    <div className="container mx-auto p-5 py-0 h-[92px] flex justify-between items-center shadow-lg">
      <div className='relative w-[183px] h-[32px]'>
        <Image src="/Logo.png" alt="logo Full Stack Week" fill />
      </div>

      {status === 'unauthenticated' &&
        (
          <div className='bg-white rounded-full p-3 px-5 border border-grayLighter shadow-md flex flex-col justify-center items-center'>
            <button
              className='text-primary text-sm font-semibold'
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
        )
      }

      {status === 'authenticated' && data.user &&(
        <div className="flex items-center gap-3 border-grayLighter border border-solid rounded-full p-2 px-3 relative">
          <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer" />

          <Image
            width={34}
            height={34}
            className='rounded-full'
            src={data.user.image!}
            alt={data.user.name!}
          />

          {menuIsOpen && (
            <div className='absolute top-14 left-0 w-full h-full bg-white rounded-full shadow-md flex flex-col justify-center items-center'>
              <button
                className='text-primary text-sm font-semibold'
                onClick={handleLogoutClick}
                >
                  Logout
                </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header