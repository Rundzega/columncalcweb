import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import * as BsIcons from 'react-icons/bs'


export const SidebarData = [
    {
        title: 'Início',
        path: '/',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text'
    },
    {
        title: 'Geometria e Cargas',
        path: '/geometry',
        icon: <GiIcons.GiPisaTower />,
        cName: 'nav-text'
    },
    {
        title: 'Materiais',
        path: '/materials',
        icon: <GiIcons.GiWheelbarrow />,
        cName: 'nav-text'
    },
    {
        title: 'Seção Transversal',
        path: '/cross-section',
        icon: <GiIcons.GiIBeam />,
        cName: 'nav-text'
    },
    {
        title: 'Resultados',
        path: '/results',
        icon: <BsIcons.BsCalculator />,
        cName: 'nav-text'
    },
]