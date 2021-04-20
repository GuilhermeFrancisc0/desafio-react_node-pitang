/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import format from 'date-fns/format';
import formatISO9075 from 'date-fns/formatISO9075';
// import getMinutes from 'date-fns/getMinutes';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import { AppContext } from '../../AppContextProvider';
import axios from '../../utils/api';
import Modal from '../../components/Modal';

export default function ListaAgendamento() {
  const [agendamentos, setAgendamentos] = useContext(AppContext);
  const agendamentosSorted = [...agendamentos]; // ordenado por ordem de Agendamento
  const [conclusaoAgendamento, setConclusaoAgendamento] = useState({});
  const [showModal, setShowModal] = useState(false); //
  const [text, setText] = useState(''); //

  function formatarHorario(data) {
    return format(new Date(data), 'HH:mm');
  }
  function formatarData(data) {
    const arrData = data.split('-');
    return (`${arrData[2]}/${arrData[1]}/${arrData[0]}`);
  }

  agendamentosSorted.sort((a, b) => new Date(a.dataHoraAgend) - new Date(b.dataHoraAgend));

  const grupos = agendamentosSorted.reduce((grupo, agendamento) => {
    if (agendamento.dataHoraAgend) {
      const dataAgendamento = formatISO9075(new Date(agendamento.dataHoraAgend), { representation: 'date' });
      if (!grupo[dataAgendamento]) {
        // eslint-disable-next-line no-param-reassign
        grupo[dataAgendamento] = [];
      }
      grupo[dataAgendamento].push(agendamento);
    }
    return grupo;
  }, {});

  const gruposAgendamentos = Object.keys(grupos).map((dataAgendamento) => ({
    dataAgendamento,
    agendamento: grupos[dataAgendamento],
  }));

  // console.log(gruposAgendamentos);

  // ----------------Área do enfermeiro--------------------------

  const handleChecked = async (event, agendamentoChecked) => {
    const { checked: atendido } = event.target;
    const newAgendamentos = agendamentos.map((agendamento) => {
      if (agendamento._id === agendamentoChecked._id) {
        return {
          ...agendamento,
          atendido,
        };
      }
      return agendamento;
    });
    try {
      await axios.put(`/agendamento/${agendamentoChecked._id}`, { ...agendamentoChecked, atendido });

      setAgendamentos(newAgendamentos);
      if (agendamentoChecked.atendido) {
        toast.info(`Paciente "${agendamentoChecked.nome}" não atendido!`);
      } else if (!agendamentoChecked.atendido) {
        toast.info(`Paciente "${agendamentoChecked.nome}" atendido!`);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  };

  const handleConclusao = (agendamento) => {
    setConclusaoAgendamento(agendamento);
    setText(agendamento?.conclusao);
    setShowModal(!showModal);
  };

  const onConclusaoAgendamento = async () => {
    const newAgendamentos = agendamentos.map((agendamento) => {
      if (agendamento._id === conclusaoAgendamento._id) {
        return {
          ...agendamento,
          conclusão: text,
        };
      }
      return agendamento;
    });
    try {
      await axios.put(`/agendamento/${conclusaoAgendamento._id}`, { ...conclusaoAgendamento, conclusao: text });

      setAgendamentos(newAgendamentos);
      toast.info(`Conclusão do atendimento de ${conclusaoAgendamento.nome} editado!`);
      handleConclusao();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  };
  return (
    <Page title="Lista de Agendamentos">
      <>
        {gruposAgendamentos.length ? (
          gruposAgendamentos.map((grupoAgendamentos, index) => (
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
                      <label htmlFor="atendidoCheckbox">
                        <input
                          checked={agendamento.atendido}
                          onChange={(event) => handleChecked(event, agendamento)}
                          type="checkbox"
                          name="atendidoCheckbox"
                        />
                        {' '}
                        Atendido
                      </label>
                      <button className="btn btn-primary ml-2" type="button" onClick={() => handleConclusao(agendamento)}>
                        {' Conclusão'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ))) : (
            <span className="empty-state">
              Não há nenhum agendamento
            </span>
        )}
        <Modal
          onSubmit={onConclusaoAgendamento}
          show={showModal}
          toggle={() => handleConclusao()}
          title={`Paciente: ${conclusaoAgendamento?.nome}`}
        >
          <Form>
            <Form.Group>
              <Form.Label>Conclusão do atendimento:</Form.Label>
              <Form.Control value={text} onChange={({ target: { value } }) => setText(value)} />
            </Form.Group>
          </Form>
        </Modal>
      </>
    </Page>
  );
}
