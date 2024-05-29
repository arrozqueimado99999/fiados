import React from "react";
import {TbHome, TbUsersGroup} from 'react-icons/tb';

export const SideBarData = [
    {
        tittle: 'Início',
        icon: <TbHome/>,
        path: '/'
    },
    {
        tittle: 'Clientes',
        icon: <TbUsersGroup/>,
        path: '/clientes'
    }
];