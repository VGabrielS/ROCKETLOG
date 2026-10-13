# RocketLog

API de rastreamento de entregas de encomendas. Modela o ciclo de uma entrega — do pedido até a entrega final — com controle de acesso por papel de usuário e um histórico (log) de status por encomenda.

## Papéis de usuário

- **customer** — cliente que acompanha o status das próprias entregas.
- **sale** — responsável pelo cadastro e operação das entregas (criação, listagem, atualização de status e registro de logs).

## Conceitos de domínio

- **User** — usuário da plataforma, com papel (`role`) `customer` ou `sale`.
- **Delivery** — uma encomenda, vinculada a um usuário (`customer`), com status `processing → shipped → delivered`.
- **DeliveryLog** — um registro de histórico (log) textual associado a uma entrega, criado a cada atualização de status.

O modelo de dados completo está em [`prisma/schema.prisma`](prisma/schema.prisma).

## Endpoints

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| `POST` | `/users` | público | Cria um usuário (`customer` por padrão) |
| `POST` | `/sessions` | público | Autentica por e-mail/senha e retorna um JWT |
| `POST` | `/deliveries` | `sale` | Cria uma entrega para um usuário |
| `GET` | `/deliveries` | `sale` | Lista todas as entregas |
| `PATCH` | `/deliveries/:id/status` | `sale` | Atualiza o status de uma entrega (gera um `DeliveryLog`) |
| `POST` | `/delivery-logs` | `sale` | Cria um log manual para uma entrega |
| `GET` | `/delivery-logs/:delivery_id/show` | `sale`, `customer` | Mostra uma entrega com seus logs — um `customer` só pode ver a própria entrega |

Todas as rotas acima, exceto `/users` e `/sessions`, exigem o header `Authorization: Bearer <token>`.

## Arquitetura

- **Node.js** + **TypeScript**, com **Express**.
- Organização por camadas: `routes` → `controllers` (validação de entrada com **Zod**) → `services` (regras de negócio) → `repository` (acesso a dados via **Prisma**).
- **Prisma** como ORM sobre **PostgreSQL**.
- Autenticação **JWT** (`jsonwebtoken`), com `role` e `sub` (id do usuário) embutidos no token; validade padrão de 1 dia (`src/configs/auth.ts`).
- Autorização por papel feita pelo middleware `verifyUserAuthorization` (`src/middlewares/verifyUserAutorization.ts`), aplicado por rota/grupo de rotas.
- Senhas com hash via `bcrypt`.
- Tratamento de erros centralizado (`src/middlewares/error-handling.ts`), com `express-async-errors` capturando erros assíncronos dos controllers e formatando erros de validação do Zod.
- Alias de import `@/*` apontando para `src/*` (configurado em `tsconfig.json`, resolvido nativamente por `tsx`/`tsup`/`ts-jest`).

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm
- Docker (opcional, para o PostgreSQL via `docker-compose`) ou um PostgreSQL já disponível

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env-example .env
```

| Variável | Descrição |
| --- | --- |
| `DATABASE_URL` | Connection string do PostgreSQL |
| `JWT_SECRET` | Segredo usado para assinar/validar os tokens JWT |
| `PORT` | Porta da API (padrão `3333`) |

### 3. Subir o banco de dados

```bash
docker compose up -d
```

> O `docker-compose.yml` sobe um PostgreSQL (`postgres`/`postgres`/`rocketlog`) na porta `5432`. Ajuste `DATABASE_URL` no `.env` de acordo se mudar essas credenciais.

### 4. Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

### 5. Rodar a API em desenvolvimento

```bash
npm run dev
```

API disponível em `http://localhost:3333` (ou na porta definida em `PORT`).

### Build de produção

```bash
npm run build
npm start
```

## Testes

```bash
npm run test:dev
```

Testes de integração com **Jest** + **Supertest** e **ts-jest** (`src/tests`), cobrindo criação de usuário e autenticação de sessão.

## Stack

Node.js, TypeScript, Express, Prisma, PostgreSQL, Zod, JWT, bcrypt, Jest/Supertest, Docker Compose.
