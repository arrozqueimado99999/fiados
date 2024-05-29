import { getFirestore, addDoc, updateDoc, collection, deleteDoc, doc, query, where, getDocs, serverTimestamp, Timestamp } from "firebase/firestore";
import { listClientes } from "./clientes";

const db = getFirestore();

export const createConta = async (descricao, valor, pago, clienteId, data) => {
  // Convertendo a data do input para um timestamp do Firestore
  const dataCriacao = Timestamp.fromDate(new Date(data));

  await addDoc(collection(db, "contas"), {
    descricao,
    valor: parseFloat(valor),
    pago,
    clienteId,
    dataCriacao: dataCriacao
  });
};

export const deleteConta = async (id, a, b) => {
  const userDoc = doc(db, "contas", id);
  await deleteDoc(userDoc);
  listClientes(a, b);
};

export const listContas = async (clienteId, setContas) => {
  const q = query(collection(db, "contas"), where("clienteId", "==", clienteId));
  const querySnapshot = await getDocs(q);
  const contasArray = [];
  querySnapshot.forEach((doc) => {
    contasArray.push({ id: doc.id, ...doc.data() });
  });
  setContas(prevContas => ({ ...prevContas, [clienteId]: contasArray }));
};

export const marcarComoPago = async (contaId, clienteId, setContas) => {
  const contaRef = doc(db, "contas", contaId);
  try {
    await updateDoc(contaRef, {
      pago: true
    });
    listContas(clienteId, setContas);
  } catch (error) {
    console.error("Erro ao marcar a conta como paga: ", error);
  }
};
