// CreateContaForm.js
import React, { useState } from 'react';

const clienteModal = ({ clienteId }) => {
  const handleSubmit = () => {
    handleCreateConta(clienteId, inputDesc, inputValor, inputPago);
    setInputDesc('');
    setInputValor('');
    setInputPago(false);
  };

  return (
    <div className='modalContent'>
        <nav className='nav'>
            <p>cliente.nome</p>
        </nav>
      <input
        placeholder='Descrição'
        type="text"
        value={inputDesc}
        onChange={(e) => setInputDesc(e.target.value)}
      />
      <input
        placeholder='Valor'
        type="number"
        value={inputValor}
        onChange={(e) => setInputValor(e.target.value)}
      />

        <input type="checkbox" id="checkboxInput"
        checked={inputPago}
        onChange={(e) => setInputPago(e.target.checked)}
        />
        <label for="checkboxInput" class="toggleSwitch">
        </label>
      <button className='outline' onClick={handleSubmit}>
        Criar conta
      </button>
    </div>
  );
};

export default clienteModal;
