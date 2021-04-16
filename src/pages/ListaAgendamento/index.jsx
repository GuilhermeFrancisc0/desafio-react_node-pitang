/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import format from 'date-fns/format';
import formatISO9075 from 'date-fns/formatISO9075';
import Page from '../../components/Page';
import { AppContext } from '../../AppContextProvider';

export default function ListaAgendamento() {
  const [agendamentos] = useContext(AppContext);
  const agendamentosSorted = [...agendamentos]; // ordenado por ordem de Agendamento

  function formatarHorario(data) {
    return format(new Date(data), 'HH:mm');
  }
  function formatarData(data) {
    const arrData = data.split('-');
    return (`${arrData[2]}/${arrData[1]}/${arrData[0]}`);
  }

  agendamentosSorted.sort((a, b) => new Date(a.dataHoraAgend) - new Date(b.dataHoraAgend));

  // console.log(agendamentosSorted);

  const grupos = agendamentosSorted.reduce((grupo, agendamento) => {
    const dataAgendamento = formatISO9075(new Date(agendamento.dataHoraAgend), { representation: 'date' });
    if (!grupo[dataAgendamento]) {
      // eslint-disable-next-line no-param-reassign
      grupo[dataAgendamento] = [];
    }
    grupo[dataAgendamento].push(agendamento);
    return grupo;
  }, {});

  const gruposAgendamentos = Object.keys(grupos).map((dataAgendamento) => ({
    dataAgendamento,
    agendamento: grupos[dataAgendamento],
  }));

  // console.log(gruposAgendamentos);

  return (
    <Page title="Lista de Agendamentos">
      { gruposAgendamentos.map((grupoAgendamentos, index) => (
        <Table key={index} bordered striped>
          <thead>
            <tr>
              <th>
                Data e Horário do Agendamento (
                {formatarData(grupoAgendamentos.dataAgendamento)}
                )
              </th>
              <th width="33%">Nome</th>
              <th>Área do enfermeiro</th>
            </tr>
          </thead>
          <tbody>
            {grupoAgendamentos.agendamento.map((agendamento, i) => (
              <tr key={i}>
                <td>{formatarHorario(agendamento.dataHoraAgend)}</td>
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
      ))}
    </Page>
  );
}
