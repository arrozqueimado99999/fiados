import React, { useState, useEffect } from 'react';
import '../css/App.css';
import { HiCurrencyDollar, HiOutlineTrash } from 'react-icons/hi';
import { marcarComoPago, deleteConta, buscarContasPorCliente } from '../model/contas';
import { formatCurrency } from '../utils';

export function ResumoPage({ cliente }) {
  const [contas, setContas] = useState({});

  useEffect(() => {
    // Aqui você pode carregar as contas do cliente usando uma função de busca apropriada do Firestore
    const fetchContas = async () => {
      // Supondo que você tenha uma função para buscar contas por cliente ID
      const fetchedContas = await buscarContasPorCliente(cliente.id);
      setContas(fetchedContas);
    };
    fetchContas();
  }, [cliente]);

  return (
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
  );
}

export default ResumoPage;
