/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState, useEffect } from 'react';
import {
  Form, Formik, Field, ErrorMessage,
} from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import differenceInYears from 'date-fns/differenceInYears';
import Page from '../../components/Page';
import DatePickerType from '../../components/DatePicker/datePickerType';
import { AppContext } from '../../AppContextProvider';
import axios from '../../utils/api';

export default function index() {
  const [agendamentos, setAgendamentos, fetchData] = useContext(AppContext);

  const InitialFormLocalStorage = JSON.parse(localStorage.getItem('dados do agendamento'));
  const initialState = {
    nome: InitialFormLocalStorage?.nome || '',
    dataNasc: InitialFormLocalStorage?.dataNasc || '',
    dataHoraAgend: InitialFormLocalStorage?.dataHoraAgend || new Date(),
  };
  const [form, setForm] = useState(initialState);

  const isIdoso = (dataNascimento) => {
    const idade = differenceInYears(Date.now(), new Date(dataNascimento));

    if (idade < 60) { // admitindo que uma pessoa é considerada idosa com 60+ anos
      return false;
    }
    return true;
  };

  const onSubmit = async (formValues) => {
    try {
      const response = await axios.post('/agendamento', {
        ...formValues,
        idoso: isIdoso(formValues.dataNasc),
        atendido: false,
        conclusao: '',
      });

      setAgendamentos([...agendamentos, response.data.data]);

      fetchData();

      toast.info('Agendamento criado!');
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O campo do nome é obrigatório'),
    dataNasc: Yup.date().required('O campo da data de nascimento é obrigatório'),
    dataHoraAgend: Yup.date().required('O campo da data e horário do agendamento é obrigatório').nullable(),
  });

  const onChangeLS = (event) => { // OnChange para setar o localStorage
    const { target: { name, value } } = event;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const formLS = JSON.parse(localStorage.getItem('dados do agendamento'));

    if (!formLS) {
      return;
    }
    if (form.nome === '' && form.dataNasc === '') {
      setForm(formLS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dados do agendamento', JSON.stringify(form));
  }, [form]);

  return (
    <Page title="Realizar Agendamento">
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <div className="form-group">
              <label htmlFor="nome" className="form-label">
                Informe seu nome:
              </label>
              <Field
                name="nome"
                className="form-control"
                onChange={(e) => {
                  props.handleChange(e);
                  onChangeLS(e);
                }}
              />
              <ErrorMessage name="nome">
                {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-group">
              <label htmlFor="dataNasc" className="form-label">
                Informe sua data de nascimento:
              </label>
              <Field
                name="dataNasc"
                type="date"
                className="form-control"
                onChange={(e) => {
                  props.handleChange(e);
                  onChangeLS(e);
                }}
              />
              <ErrorMessage name="dataNasc">
                {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-group">
              <label htmlFor="dataHoraAgend" className="form-label">
                Informe a data e horário do agendamento:
              </label>
              <br />
              <DatePickerType
                name="dataHoraAgend"
                value={props.values.dataHoraAgend}
                onChange={props.setFieldValue}
                className="form-control"
              />
              <br />
              <ErrorMessage name="dataHoraAgend">
                {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              </ErrorMessage>
            </div>
            <button className="btn btn-primary mt-2" type="submit">
              Efetuar Agendamento
            </button>
          </Form>
        )}
      </Formik>
    </Page>
  );
}
