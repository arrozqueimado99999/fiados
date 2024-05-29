// clientes.js
import { getFirestore, addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { listContas } from './contas';

const db = getFirestore();

export const createCliente = async (nome) => {
  await addDoc(collection(db, "clientes"), {
    nome,
    dataCriacao: serverTimestamp()
  });
};

export const deleteCliente = async (id) => {
  const userDoc = doc(db, "clientes", id);
  await deleteDoc(userDoc);
};

export const listClientes = (setStoredValues, setContas) => {
  onSnapshot(collection(db, "clientes"), (snapshot) => {
    const temporaryArr = [];
    snapshot.forEach((doc) => {
      temporaryArr.push({ id: doc.id, ...doc.data() });
    });
    setStoredValues(temporaryArr);
    temporaryArr.forEach(cliente => listContas(cliente.id, setContas));
  });
};
