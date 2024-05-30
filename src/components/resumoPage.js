import React, { useState } from 'react';
import '../css/App.css';
import { HiCurrencyDollar, HiOutlineTrash } from 'react-icons/hi';
import { marcarComoPago, deleteConta } from '../model/contas';
import { formatCurrency } from '../utils';

export function ResumoPage({ cliente }) {
  const [contas, setContas] = useState({});

  return (
    <nav className='container'>
      <div className='listContas'>
        {contas[cliente.id] && contas[cliente.id].map((conta, i) => (
          <div className={`conta ${conta.pago ? 'pago-true' : 'pago-false'}`} key={i}>
            <p className='desc'>{conta.descricao}</p>
            <div className='flex-end'>
              <div className='inv'>
                <button className='btnDisc' onClick={() => marcarComoPago(conta.id, cliente.id, setContas)}>
                  <HiCurrencyDollar />
                </button>
                <button className='btnDisc' onClick={() => deleteConta(conta.id, setContas)}>
                  <HiOutlineTrash />
                </button>
              </div>
              <p className='valor'>{formatCurrency(conta.valor)}</p>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default ResumoPage;
