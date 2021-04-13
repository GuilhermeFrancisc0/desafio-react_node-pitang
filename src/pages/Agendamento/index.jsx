/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import {
  Form, Formik, Field, ErrorMessage,
} from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Page from '../../components/Page';
import DatePickerType from './dataPickerType';
import { AppContext } from '../../AppContextProvider';
// import axios from '../../utils/api';

export default function index() {
  const [agendamentos, setAgendamentos] = useContext(AppContext);

  const onSubmit = async (values) => {
    // Versão de testes
    console.log(values);
    setAgendamentos([...agendamentos, values]);
    console.log(agendamentos);
    toast.info(JSON.stringify(values, null, 2));
    // --------------------------------------------------------------
    // Comentado até finalizar o backend
    // try {
    //   const response = await axios.post('/agendamento', values);

    //   setAgendamentos([...agendamentos, response.data.data]);

    //   toast.info('Agendamento criado!');
    // } catch (e) {
    //   console.log(e.message);
    // }
  };
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O campo do nome é obrigatório'),
    dataNasc: Yup.date().required('O campo da data de nascimento é obrigatório'),
    dataHoraAgend: Yup.date().required('O campo da data e horário do agendamento é obrigatório'),
  });
  return (
    <Page title="Realizar Agendamento">
      <Formik
        initialValues={{
          nome: '',
          dataNasc: '',
          dataHoraAgend: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(props) => {
          const {
            values,
            setFieldValue,
          } = props;
          return (
            <Form>
              <div className="form-group">
                <label htmlFor="nome" className="form-label">Digite seu nome:</label>
                <Field name="nome" className="form-control" />
                <ErrorMessage name="nome">
                  { (msg) => <div style={{ color: 'red' }}>{msg}</div> }
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label htmlFor="dataNasc" className="form-label">Digite sua data de nascimento:</label>
                <Field name="dataNasc" type="date" className="form-control" />
                <ErrorMessage name="dataNasc">
                  { (msg) => <div style={{ color: 'red' }}>{msg}</div> }
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label htmlFor="dataHoraAgend" className="form-label">Informe a data e horário do agendamento: </label>
                <br />
                <DatePickerType
                  name="dataHoraAgend"
                  value={values.dataHoraAgend}
                  onChange={setFieldValue}
                  className="form-control"
                />
                <br />
                <ErrorMessage name="dataHoraAgend">
                  { (msg) => <div style={{ color: 'red' }}>{msg}</div> }
                </ErrorMessage>
              </div>
              <button className="btn btn-primary mt-2" type="submit">Efetuar Agendamento</button>
            </Form>
          );
        }}
      </Formik>
    </Page>
  );
}
