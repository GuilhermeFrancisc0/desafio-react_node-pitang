import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Page from '../../components/Page';

export default function index() {
  const initialState = {
    nome: '',
    dataNasc: '',
    diaAgendamento: '',
    horarioAgendamento: '',
  };

  const [form, setForm] = useState(initialState);

  const isFormValid = form.nome && form.dataNasc && form.diaAgendamento && form.horarioAgendamento;

  const onChange = (event) => {
    const { target: { name, value } } = event;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      toast.info('Agendamento criado!');
      // history.push('/[outra rota]'); (sugestão)
    } else {
      toast.error('Formulário incompleto!');
    }
  };
  return (
    <div>
      <Page title="Realizar Agendamento">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control required onChange={onChange} name="nome" value={form.nome} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control required onChange={onChange} name="dataNasc" value={form.dataNasc} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dia para o Agendamento</Form.Label>
            <Form.Control required onChange={onChange} name="diaAgendamento" value={form.diaAgendamento} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Horário para o Agendamento</Form.Label>
            <Form.Control required onChange={onChange} name="horarioAgendamento" value={form.horarioAgendamento} />
          </Form.Group>
          <Button type="submit" disabled={!isFormValid}>Enviar</Button>
        </Form>
      </Page>
    </div>
  );
}
