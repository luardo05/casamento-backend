1. README para o Backend (wedding-backend/README.md)

Este README foca nas configurações de servidor, variáveis de ambiente e rotas da API.

code
Markdown
download
content_copy
expand_less
# 💍 Wedding Manager API (Backend)

Backend do sistema de gerenciamento de lista de casamento e presentes. Desenvolvido com **Node.js**, **Express** e **MongoDB**.

## 🚀 Funcionalidades

- **Gerenciamento de Convidados (RSVP):**
  - Confirmação de presença (Nome + Acompanhante).
  - Geração de Token único para identificar o convidado em acessos futuros.
- **Lista de Presentes Inteligente:**
  - Controle de estoque (quantidade limitada por item).
  - Associação automática do presente ao convidado que o escolheu.
  - Bloqueio de duplicidade (um convidado não pode escolher o mesmo item 2x).
- **Painel Administrativo (Noivos):**
  - Login seguro com JWT.
  - Relatório de convidados confirmados.
  - Relatório detalhado de presentes (quem deu o quê).

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JsonWebToken) para autenticação
- BCryptJS para criptografia de senhas
- Cors & Dotenv

## ⚙️ Configuração e Instalação

1. **Clone o repositório:**
   ```bash
   git clone <link-do-seu-repo-backend>
   cd wedding-backend

Instale as dependências:

code
Bash
download
content_copy
expand_less
npm install

Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz e preencha:

code
Env
download
content_copy
expand_less
PORT=3000
MONGO_URI=sua_string_de_conexao_mongodb_atlas
JWT_SECRET=uma_frase_secreta_para_seguranca
FRONTEND_URL=Link_do_seu_frontend_no_render

Inicie o servidor:

code
Bash
download
content_copy
expand_less
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
📡 Rotas da API
Convidados

POST /api/guests/rsvp - Confirma presença e gera token.

GET /api/guests/me - Retorna dados do convidado (Requer Header x-invite-token).

Presentes

GET /api/gifts - Lista todos os presentes e disponibilidade.

POST /api/gifts/:id/select - Convidado escolhe um presente (Requer Header x-invite-token).

POST /api/gifts - Cria um novo presente (Admin ou via Postman/Seed).

Admin (Noivos)

POST /api/admin/register - Cria o primeiro usuário admin.

POST /api/admin/login - Faz login e retorna Bearer Token.

GET /api/admin/guests - Relatório de convidados (Requer Bearer Token).

GET /api/admin/gifts - Relatório de presentes (Requer Bearer Token).

☁️ Deploy (Render)

Este projeto está configurado para rodar no Render como Web Service. Lembre-se de configurar as variáveis de ambiente no painel do Render.

code
Code
download
content_copy
expand_less
---
