import React from "react";
import {HiHome , HiUsers } from 'react-icons/hi';

export const SideBarData = [
    {
        tittle: 'Início',
        icon: <HiHome />,
        path: '/'
    },
    {
        tittle: 'Clientes',
        icon: <HiUsers />,
        path: '/clientes'
    }
];