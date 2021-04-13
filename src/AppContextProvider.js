import React, { createContext, useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import axios from './utils/api';

export const AppContext = createContext(); // Criação no app para ser "escutada" nas pages

export default function AppContextProvider({ children }) {
  // Criação do state para renderizar no frontend
  const [agendamentos, setAgendamentos] = useState([]);

  const fetchData = async () => { // Busca os dados agendamentos do backend
    // Comentado até finalizar o backend
    // try {
    //   const response = await axios.get('/agendamento'); // get para buscar na rota de agendamento
    //   setAgendamentos(response.data.data); // atualizar a lista de agendamentos local
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  useEffect(() => { // Começo do código, quando a página é renderizada
    fetchData(); // Ativa a função de buscar dados
  }, []);
  return (
    <AppContext.Provider value={[agendamentos, setAgendamentos, fetchData]}>
      {children}
    </AppContext.Provider>
  );
}
