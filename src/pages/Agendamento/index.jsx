/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Form, Formik, Field, ErrorMessage,
} from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Page from '../../components/Page';
import DatePickerType from './dataPickerType';

export default function index() {
  const onSubmit = (values) => {
    toast.info(JSON.stringify(values, null, 2));
    // history.push('/[outra rota]'); (sugestão)
  };
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O campo do nome é obrigatório'),
    dataNasc: Yup.date().required('O campo da data de nascimento é obrigatório'),
    dataAgend: Yup.date().required('O campo da data e horário do agendamento é obrigatório'),
  });
  return (
    <Page title="Realizar Agendamento">
      <Formik
        initialValues={{
          nome: '',
          dataNasc: '',
          dataAgend: '',
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
                <label htmlFor="dataAgend" className="form-label">Informe a data e horário do agendamento: </label>
                <br />
                <DatePickerType
                  name="dataAgend"
                  value={values.dataAgend}
                  onChange={setFieldValue}
                  className="form-control"
                />
                <br />
                <ErrorMessage name="dataAgend">
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
