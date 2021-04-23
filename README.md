# Parte Frontend do desafio react_node da Pitang

## Descrição do projeto

O projeto consiste na criação de um portal de agendamentos para pacientes receberem a vacina da COVID-19. Para elaboração do projeto foram criadas duas páginas, uma página contendo um formulário para o paciente informar seus dados e a data do agendamento que deseja. Outra página para consultar a lista de agendamentos, onde nesta listagem há uma área do enfermeiro, em que o mesmo pode informar se o paciente foi atendido ou não, e qual a conclusão do atendimento.

## Observações

Como foi acordado na reunião e mensagens de tira dúvida:
- Número de 20 vagas diárias sendo elas fracionadas em 30min cada, indo das 8hrs até as 17hrs:30min;
- Caso um paciente idoso selecione uma vaga preenchida por um jovem, o idoso passa a ocupar aquela vaga no lugar do jovem;
- Utilização do react-datepicker para o gerenciamento do dia e horário do agendamento;
- Utilização do Formik para a construção do formulário do agendamento;
- Utilização do Axios como cliente http;
- Utilização do react-toastify para exibições de mensagens de validações;
- Utilização do Bootstrap e react-bootstrap para o estilo das páginas;

## Execução do Projeto

- Ao realizar o download dos arquivos, utilizar o comando `yarn` ou `npm i` no diretório da pasta, afim de baixar as dependências do projeto;
- Checar as variáveis de ambiente no arquivo .env;
- Por último, utilizar o comando `yarn start` ou `npm run start` no diretório da pasta, afim de rodar a aplicação no modo de desenvolvimento; 
- Em seguida, o projeto irá abrir no [http://localhost:3000](http://localhost:3000) para ser visto no browser;\
Obs: Executar a parte Backend do projeto antes ([https://github.com/GuilhermeFrancisc0/desafio-react_node-pitang-backend](https://github.com/GuilhermeFrancisc0/desafio-react_node-pitang-backend)).