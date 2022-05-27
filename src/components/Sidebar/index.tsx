import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from '../SidebarData'
import { IconContext } from 'react-icons'

function Sidebar(){
    const [sidebar, setSidebar] = useState(false)
    const showSideBar = () => setSidebar(!sidebar)

    return (
        <>
        <IconContext.Provider value={{color: '#71C562'}}>
            <div className='bg-white h-20 flex justify-start items-center sticky top-0 z-50'>
                <Link to="#" className='ml-8 text-3xl bg-none'>
                    <FaIcons.FaBars onClick={showSideBar}/>
                </Link>
                <h1 className='absolute left-[50%] text-brandGreen-300 font-bold translate-x-[-50%] text-3xl z-50'>ColumnCalc</h1>
            </div>
            <nav className={sidebar ? 'bg-white w-full h-screen flex justify-center fixed left-0 top-0 duration-300 z-40 md:w-64' : 'bg-white w-full h-screen flex justify-center fixed top-0 left-[-100%] duration-700 z-40 md:w-64'}>
                <ul className='w-full' onClick={showSideBar}>
                    <li className='bg-white w-full h-20 flex justify-start items-center'>
                        <Link to="#" className='ml-8 text-3xl bg-none text-brandGreen-300'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className='flex justify-start items-center pt-2 pr-0 pb-2 pl-2 list-none h-20'>
                                <Link to={item.path} className='no-underline text-brandGreen-300 text-lg w-[95%] h-full flex items-center px-4 rounded-md hover:bg-brandBlue-300'>
                                    {item.icon}
                                    <span className='ml-2'>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default Sidebar