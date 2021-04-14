import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import Page from '../../components/Page';
import { AppContext } from '../../AppContextProvider';

export default function ListaAgendamento() {
  const [agendamentos] = useContext(AppContext);

  return (
    <Page title="Lista de Agendamentos">
      <Table bordered striped>
        <thead>
          <tr>
            <th>Data e Horário do Agendamento</th>
            <th width="50%">Nome</th>
            <th>Área do enfermeiro</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.id}>
              <td>{agendamento.dataHoraAgend}</td>
              <td>{agendamento.nome}</td>
              <td>
                <button type="button">
                  {' Atendido?'}
                </button>
                <button type="button">
                  {' Conclusão'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}
