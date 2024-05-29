import React from 'react';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
            <Tab>Contas</Tab>
            <Tab>Histórico</Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>

    </div>
  );
};

export default ClienteModal;
