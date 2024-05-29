import React from 'react';
import './css/App.css';
import Sidebar from './components/Sidebar';
import Clientes from './view/Clientes';
import Inicio from './view/Inicio';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Sidebar/>

      <Routes>
        <Route path=  '/' element={<Inicio/>}/>
        <Route path=  '/clientes' element={<Clientes/>}/>
      </Routes>
    </div>
  );
}

export default App;