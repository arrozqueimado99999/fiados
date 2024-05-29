import React from 'react';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const contasList = ({ clienteid }) => {
    const [contas, setContas] = useState({});

    
  return (
    <div className='container'>
        <div className='conta'>
            {contas[cliente.id] && contas[cliente.id].map((conta, i) => (
                <div className={`conta ${conta.pago ? 'pago-true' : 'pago-false'}`} key={i}>
                    <p className='desc'>{conta.descricao}</p>
                    <div className='flex-end'>
                    <div className='inv'>
                        <button className='btnDisc' onClick={() => deleteConta(conta.id, setStoredValues, setContas)}>
                        <TbTrash />
                        </button>
                    </div>
                    <p className='valor'>{formatCurrency(conta.valor)}</p>
                    </div>                      
                </div>
            ))}
        </div>

    </div>
  );
};

export default ClienteModal;
