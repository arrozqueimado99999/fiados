// Notif.js
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../index.css'; // Certifique-se de criar e ajustar este arquivo CSS conforme necessário

const Notif = ({ type }) => {
  const getMessageAndIcon = () => {
    if (type === 'confirm') {
      return {
        message: 'Conta criada com sucesso!',
        icon: <FaCheckCircle className="notif-icon success" />
      };
    } else if (type === 'failed') {
      return {
        message: 'Erro ao criar a conta.',
        icon: <FaTimesCircle className="notif-icon error" />
      };
    }
    return {};
  };

  const { message, icon } = getMessageAndIcon();

  return (
    <div className={`notif ${type}`}>
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default Notif;
