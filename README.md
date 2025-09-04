# Projeto de Teste (Versão 2): CRUD de Usuários e Tarefas com TypeScript

Este projeto é uma **variação aprimorada** do [projeto anterior em JavaScript](https://github.com/vitoledo/crud-usersandtasks-js), que tinha como objetivo implementar uma API básica com **Node.js**, **Express** e **Zod**.  

Agora, o código foi **reescrito em TypeScript**, mantendo a validação com **Zod**, porém ainda utilizando **armazenamento local em memória** (sem banco de dados).  

---

## 🚀 O que mudou nesta versão

- Reescrita completa em **TypeScript** para maior segurança e escalabilidade  
- Melhor tipagem de dados para usuários e tarefas  
- Validação com **Zod** mantida e integrada aos tipos do TypeScript  
- Estrutura de código mais organizada e modular  
- Mantém armazenamento **em memória** (sem banco de dados) para fins de simplicidade  

---

## 🎯 Objetivo

Criar uma API REST que permita:

1. Cadastrar, listar, atualizar e deletar **usuários**
2. Cadastrar, listar, atualizar e deletar **tarefas**
3. Associar tarefas a usuários
4. Validar todos os dados recebidos
5. Implementar regras de negócio básicas

---

## ⚙️ Tecnologias utilizadas

- Node.js  
- Express  
- TypeScript  
- Zod  

(Opcionalmente pode ser estendido para usar banco de dados ou ORM no futuro)

---

## 🧱 Estrutura dos dados

### 🧑 Usuário

| Campo       | Tipo      | Regras                               |
|-------------|-----------|--------------------------------------|
| `id`        | string    | gerado automaticamente               |
| `name`      | string    | obrigatório                          |
| `email`     | string    | obrigatório e único                  |
| `status`    | string    | "ativo" ou "inativo" (default: ativo)|
| `createdAt` | datetime  | gerado automaticamente               |
| `updatedAt` | datetime  | atualizado a cada modificação        |

---

### ✅ Tarefa

| Campo        | Tipo      | Regras                                             |
|--------------|-----------|----------------------------------------------------|
| `id`         | string    | gerado automaticamente                             |
| `name`       | string    | obrigatório                                        |
| `description`| string    | opcional                                           |
| `status`     | string    | "PENDING", "EM ANDAMENTO", "FINALIZADO"            |
| `userId`     | string    | obrigatório, deve ser um usuário válido e ativo    |
| `createdAt`  | datetime  | gerado automaticamente                             |
| `updatedAt`  | datetime  | atualizado a cada modificação                      |

---

## 📚 Rotas disponíveis

### Usuários

| Método | Rota         | Descrição                |
|--------|--------------|--------------------------|
| GET    | `/users`     | Listar todos os usuários |
| GET    | `/users/:id` | Buscar usuário por ID    |
| POST   | `/users`     | Criar novo usuário       |
| PUT    | `/users/:id` | Atualizar usuário        |
| DELETE | `/users/:id` | Deletar usuário + tarefas|

---

### Tarefas

| Método | Rota              | Descrição                             |
|--------|-------------------|---------------------------------------|
| GET    | `/tasks`          | Listar todas as tarefas               |
| GET    | `/tasks/:id`      | Buscar tarefa por ID                  |
| GET    | `/tasks/user/:id` | Listar todas as tarefas de um usuário |
| POST   | `/tasks`          | Criar nova tarefa (para usuário ativo)|
| PUT    | `/tasks/:id`      | Atualizar tarefa                      |
| DELETE | `/tasks/:id`      | Deletar tarefa                        |

---

## 📋 Regras de negócio implementadas

1. Um usuário **precisa estar ativo** para criar tarefas  
2. Não pode existir dois usuários com o **mesmo email**  
3. Ao deletar um usuário, suas tarefas **são removidas também**  
4. Datas de criação e atualização geradas automaticamente  
5. Status das tarefas aceita apenas os **3 valores definidos**  

---

## ✅ Como executar o projeto

## Pré-requisitos

- Node.js (versão >= 18)
- npm ou yarn

## Instalando dependências

No terminal, dentro da pasta do projeto, rode:

```bash
npm install
```

## Rodando a Aplicação

### Desenvolvimento

No terminal, dentro da pasta do projeto, rode:

```bash
npm run dev
```

### Produção

No terminal, dentro da pasta do projeto, rode:

```bash
npm run build
npm start
```
