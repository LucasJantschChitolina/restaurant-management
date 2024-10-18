## Postgres local setup

https://orm.drizzle.team/docs/guides/postgresql-local-setup

## Command to run a postgres instance on docker

`docker run --name restaurant-manager-dev -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres`

# UNIVERSIDADE DO OESTE DE SANTA CATARINA

## UNOESC – CHAPECÓ

### TRABALHO FINAL – PROGRAMAÇÃO 2 + BANCO DE DADOS 2

### ORIENTAÇÕES:
- A presente avaliação tem peso: **10.0**
- A avaliação deverá ser realizada em equipes de até 4 pessoas.
- A apresentação será realizada no dia **03/12/24**, presencialmente.
- As tecnologias utilizadas devem ser **Node.js**, **Express**, **Expo** e **PostgreSQL**.

## DESCRIÇÃO

O presente documento descreve de forma sucinta a aplicação que deve ser desenvolvida como trabalho final das disciplinas de **Programação 2** e **Banco de Dados 2**.

### TEMA
Aplicativo para controle de cardápio de um restaurante.

### REQUISITOS
- Cadastro de itens do cardápio.
- Permitir abrir e fechar comandas.
- Permitir adicionar itens do cardápio em uma comanda.
- Enviar Ordens de Produção para Copa e Cozinha.
- Relatório de vendas diária.
- Cadastro de usuários.

## ESCOPO

O cliente possui um restaurante e precisa gerenciar as comandas dos clientes presentes no estabelecimento, sendo que a cozinha e a copa precisam ser notificados de itens a serem produzidos conforme adicionados nas comandas.

O restaurante trabalha com pedidos à la carte, e uma mesa pode solicitar vários itens do cardápio. Quando o cliente chega no restaurante, uma nova comanda é aberta e todos os itens solicitados são colocados na mesma. Os itens do cardápio são compostos de pratos e bebidas. Caso a seleção seja uma bebida, esta deve ser encaminhada para a **Copa** produzir; se for um prato, deve ser encaminhado para a **Cozinha**.

A Cozinha e a Copa devem ter telas de visualização específicas no mesmo aplicativo, permitindo o acompanhamento dos itens solicitados e já produzidos, separados por comanda. Quando um item de cardápio é produzido, deve ser encaminhado para o cliente pelo garçom, que deve marcar o item como entregue na comanda.

Ao finalizar o consumo, a comanda deve ser fechada e a conta calculada para que o cliente possa efetuar o pagamento.

## FORA DO ESCOPO
- O trabalho não precisa diferenciar entre garçons e administradores do restaurante, apenas um acesso autenticado tem acesso a todas as funcionalidades.
- Não é necessário que o sistema suporte múltiplos restaurantes em um mesmo banco de dados.
- As telas de Copa e Cozinha podem ser no mesmo aplicativo, não requisitando senha específica para acesso.

## MODELAGEM

Utilizando os conceitos estudados em **Banco de Dados** e **Programação**, desenvolva uma solução para o problema acima. Esta solução, além do desenvolvimento, também requer a definição de modelagem da aplicação, que pode ser composta por **Diagrama Entidade Relacionamento**, **Diagrama de Casos de Uso**, definição da **API** do back e front end, telas no **FIGMA**, entre outros.

## ARQUITETURA

A aplicação desenvolvida deverá ser composta de dois programas distintos:

- **Backend**: deve ser desenvolvido em **Node.js**, **Express**, **Sequelize** e **PostgreSQL**. Ele é o responsável por prover os dados para o aplicativo. Toda a comunicação deve ser realizada via **API**, com troca de dados em **JSON**.
- **Frontend**: o aplicativo de frontend deve ser desenvolvido para **Android**, **iOS** ou **Web**, utilizando o framework **Expo**. O aplicativo deve consumir os dados e funcionalidades da API do backend.

## AVALIAÇÃO

### Programação 2
- **Camada de acesso ao banco de dados** (peso 2)
  - Será avaliado se foi criada uma camada específica para tratar da persistência e recuperação de dados, e se o sistema está se comunicando corretamente com o Banco de Dados.
- **Camada de regras de negócio** (peso 4)
  - Será avaliado se existe uma camada específica para validação e tratamento dos dados, bem como se as regras de negócio da aplicação estão implementadas exclusivamente nessa camada.
- **Interface gráfica** (peso 3)
  - Será avaliado se foram implementadas interfaces gráficas para entrada dos dados e se os formulários exigem apenas as informações necessárias para atender as regras de negócios, sem expor ou exigir itens que são controlados pela camada de negócios, como **IDs** e totalizadores. Serão avaliadas questões de usabilidade e segurança das interfaces gráficas (por exemplo, as interfaces não devem expor informações sensíveis da aplicação).
- **Arquitetura** (peso 1)
  - Será avaliado se a aplicação foi desenvolvida conforme a arquitetura solicitada no trabalho.

### Banco de Dados 2
- **Modelagem** (peso 4)
  - Será avaliada a modelagem lógica do banco de dados proposto.
- **SQL** (peso 4)
  - Deve ser implementado pelo menos uma **trigger** e uma **stored procedure**, conforme a necessidade do banco de dados desenvolvido.
  - Uso de índices, chaves primárias e estrangeiras.
- **ORM** (peso 2)
  - Será avaliado o uso de migrações e o uso correto do ORM.

## ENTREGA

A entrega deverá conter todos os modelos gerados, bem como a **URL** dos repositórios git que contenham o código desenvolvido.

**Boa Sorte!**