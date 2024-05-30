import React, { useRef, useState, useEffect } from 'react';
import '../css/App.css';
import '../firebaseConfig.js';
import { HiPlusCircle , HiArrowRight , HiOutlineUserAdd , HiOutlineTrash, HiCurrencyDollar } from "react-icons/hi";
import Modal from '../Modal.js';
import useModal from '../useModals.js';
import { createCliente, deleteCliente, listClientes, getClienteById } from '../model/clientes.js';
import { createConta, deleteConta, listContas, marcarComoPago } from '../model/contas.js';
import contaModal from '../components/modals/contaModal';
import ClienteModal from '../components/modals/clienteModal';
import { formatCurrency } from '../utils';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Clientes() {
  const [inputNome, setInputNome] = useState('');
  //const [inputData, setInputData] = useState(serverTimestamp);
  const [storedValues, setStoredValues] = useState([]);
  const [contas, setContas] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [isOpen, openModal, closeModal] = useModal();
  const [modalContent, setModalContent] = useState(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const inputRef = useRef(null);

  const [saldos, setSaldos] = useState({});

  useEffect(() => {
    listClientes(setStoredValues, setContas);
  }, []);

  useEffect(() => {
    // Calcular saldo para cada cliente
    const novosSaldos = {};
    Object.keys(contas).forEach((clienteId) => {
      const saldo = contas[clienteId]
        .filter((conta) => !conta.pago) // Filtrar contas não pagas
        .reduce((acc, conta) => acc - conta.valor, 0); // Somar valores
      novosSaldos[clienteId] = saldo;
    });
    setSaldos(novosSaldos);
  }, [contas]);

  const handleCreateCliente = async () => {
    await createCliente(inputNome);
    setInputNome('');
    setShowInput(false);
    listClientes(setStoredValues, setContas);
  };

  const handleCreateConta = async (clienteId, desc, valor, pago, data) => {
    try { 
      await createConta(desc, valor, pago, clienteId, data);
      listContas(clienteId, setContas);
      toast.success('Conta criada com sucesso!', {position: 'bottom-right'});
    } catch (error) {
      console.error("Erro ao criar a conta: ", error);
      toast.error('Erro ao criar a conta.');
    }
  };

  const handleOpenModal = (content) => {
    openModal();
    setModalContent(content);
  };

  const handleOpenClienteModal = async (clienteId) => {
    try {
      const cliente = await getClienteById(clienteId);
      handleOpenModal(
        <ClienteModal 
          cliente={cliente}
        />
      );
    } catch (error) {
      console.error("Erro ao buscar cliente: ", error);
      toast.error('Erro ao buscar cliente.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleCreateCliente();
    }
  };

  return (
      <div className='container'>
        <div className='nav'>
          <h2>Clientes</h2>
          <button className='outline' onClick={() => setShowInput(true)}>
            <p>Criar cliente</p>
            <HiOutlineUserAdd />
          </button>
          <input className='inputFlut' type="text" value={inputNome} onChange={(e) => setInputNome(e.target.value)} />
          {showInput && (
            <input
              ref={inputRef}
              type="text"
              value={inputNome}
              onChange={(e) => setInputNome(e.target.value)}
              onKeyPress={handleKeyPress}
              className="new-client-input"
            />
          )}

          <Modal isOpen={isOpen} onClose={closeModal}>
            {modalContent}
          </Modal>
        </div>

        <div className='grid'>
          {storedValues.map((cliente, index) => (
            <div className='clientesDiv' key={index}>
              <div className='navHeader'>
                <p className='tittle'>{cliente.nome}</p>
                <div className='flex-gap'>
                  <button className='btnDisc' onClick={() => deleteCliente(cliente.id)}>
                    <HiOutlineTrash  />
                  </button>

                  <button className='btn-sq-sml btn-solid-blue'
                    ref={buttonRef2}
                    onClick={() => handleOpenModal(<contaModal clienteId={cliente.id} handleCreateConta={handleCreateConta} />)}
                  >
                    <HiPlusCircle />
                  </button>
                </div>
              </div>
              <div className='clientesContas'>
                <hr></hr>
                <nav className='nav'>
                  <p>Contas recentes:</p>
                </nav>

                <div className='recentContas'>
                  {contas[cliente.id] && contas[cliente.id].map((conta, i) => (
                    <div className={`conta ${conta.pago ? 'pago-true' : 'pago-false'}`} key={i}>
                      <p className='desc'>{conta.descricao}</p>
                      <div className='flex-end'>
                        <div className='inv'>
                          <button className='btnDisc' onClick={() => marcarComoPago(conta.id, cliente.id, setContas)}>
                            <HiCurrencyDollar />
                          </button>

                          <button className='btnDisc' onClick={() => deleteConta(conta.id, setStoredValues, setContas)}>
                            <HiOutlineTrash />
                          </button>
                        </div>
                        <p className='valor'>{formatCurrency(conta.valor)}</p>
                      </div>                      
                    </div>
                  ))}
                </div>
                <hr></hr>
              </div>
              <div className='nav'>
                <div className={`saldo ${saldos[cliente.id] && saldos[cliente.id] < 0 ? 'negativo' : 'positivo'}`}>
                  <p className='txt'>Saldo:</p>
                  <p>{formatCurrency(saldos[cliente.id] || 0)}</p>
                </div>
                <button className='btnDisc'
                  ref={buttonRef3}
                  onClick={() => handleOpenClienteModal(cliente.id)}
                >
                  <HiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Clientes;
