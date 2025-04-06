# Título do Projeto

# Eva API

Este é o front-end da plataforma Eva, criado com React + Vite + Reat Router + TypeScript e estilizado com TailwindCSS e ShadCN UI.
O sistema permite gerenciar colaboradores, jornadas, ações e suas associações, tudo com foco em uma jornada automatizada e fluida.

## 📁 Estrutura da aplicação

src\
├── assets/ \
├── components/ \
│ ├── Action/ \
│ ├── Association/ \
│ ├── Employee/ \
│ ├── Jouney/ \
│ ├── SideMenu.tsx \
│ └── ui/ \
├── layouts/ \
├── lib/ \
├── pages/ \
├── services/ \
├── App.tsx \
├── main.tsx \

## 🧩 Componentes

### components/Action/

`CreateActionForm.tsx`: formulário usado para criar novas ações (ex: envio de e-mail ou WhatsApp).

### components/Association/

`AssociationList.tsx`: exibe as jornadas já associadas aos colaboradores.\
`CreateAssociationModal.tsx`: modal com formulário para associar colaborador a uma jornada com data.

### components/Employee/

`CreateEmployeeForm.tsx`: formulário de cadastro de colaborador.\
`EmployeeList.tsx`: listagem simples de colaboradores.\
`EmployeeTable.tsx`: tabela detalhada de colaboradores.\

### components/Jouney/

`CreateJourneyForm.tsx`: formulário para criar jornadas, com título, descrição e ações.\
`JourneyList.tsx`: listagem das jornadas já cadastradas.

### components/ui/

Componentes reutilizáveis da UI, vindos do ShadCN, como:
`button.tsx`, `input.tsx`, `form.tsx`, `dialog.tsx`, `table.tsx`

## 🧭 Navegação

### layouts/MainLayout.tsx

Layout padrão usado nas páginas, com o menu lateral (SideMenu) e área de conteúdo principal.

## 🧭 Paginas

`EmployeePage.tsx`: página principal para cadastro e visualização de colaboradores.\
`Journey.tsx`: página para criação e visualização de jornadas.

## 🌐 Integração com o Backend

A comunicação com a API é feita através da pasta:\

### services/

`api.ts`: instancia do axios.\
`EmployeeService.ts`: métodos para criar e buscar colaboradores.\
`JourneyService.ts`: criar e listar jornadas.\
`JourneyAssociationService.ts`: associar jornadas a colaboradores.\
`ActionService.ts`: criar ações associadas a jornadas.

## 🛠️ Scripts úteis (via package.json)

```bash
npm run dev       # Inicia o servidor de desenvolvimento
npm run build     # Gera a build para produção
npm run preview   # Visualiza a build localmente
```

## 📦 Tecnologias Utilizadas

- React (com Vite)\
- TypeScript\
- TailwindCSS + ShadCN UI\
- Axios para requisições HTTP\

## ⚙️ Como rodar o projeto

- ✅ Crie um .env utilizando o sample

```bash
# Instalar dependências
npm install

# Rodar em modo dev
npm run dev

# Rodar testes
npm run test
```
