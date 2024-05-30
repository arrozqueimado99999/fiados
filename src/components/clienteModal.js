import React from 'react';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ResumoPage from './resumoPage';
import PedidoPage from './pedidosPage';

const ClienteModal = ({ cliente }) => {
  return (
    <div className='clienteModal'>
      <div className='nav'>
        <div className='column'>
          <h2>{cliente.nome}</h2>
          <p>Criado em {new Date(cliente.dataCriacao.seconds * 1000).toLocaleDateString()}</p>
        </div>
      </div>

      <div className='container'>
        <Tabs>
          <TabList>
            <Tab>Visão Geral</Tab>
            <Tab>Pedidos</Tab>
          </TabList>

          <TabPanel>
            <ResumoPage/>
          </TabPanel>
          
          <TabPanel>
            <PedidoPage/>
          </TabPanel>
        </Tabs>
      </div>

    </div>
  );
};

export default ClienteModal;
