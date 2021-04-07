import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ListaAgendamento from './pages/ListaAgendamento';
import Agendamento from './pages/Agendamento';
import Navbar from './components/Navbar';

const routes = [
  {
    component: Agendamento,
    path: '/',
    name: 'Agendamento',
  },
  {
    component: ListaAgendamento,
    path: '/listaAgendamento',
    name: 'Lista de Agendamentos',
  },
];
const Routes = () => (
  <BrowserRouter>
    <Navbar routes={routes} />
    <Switch>
      {routes.map(({ path, component }) => (
        <Route key={path} exact path={path} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
