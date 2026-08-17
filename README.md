Frontend para gerenciamento de concessionárias de veículos, construído com React 19, TypeScript, Vite, TanStack Query, React Hook Form e Tailwind CSS.

## Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **TanStack Query (React Query)** - Gerenciamento de estado servidor
- **React Hook Form + Yup** - Formulários e validação
- **React Router v7** - Roteamento
- **Tailwind CSS v4** - Estilização
- **Notistack** - Notificações (toasts)
- **ESLint** - Linting

## Estrutura do Projeto

```
src/
├── Components/          # Componentes reutilizáveis (Button, InputField, Card, etc.)
├── Context/             # Contextos React (Modal, Loading)
├── Hooks/               # Custom hooks (useVehiclesListPage, useDealerFormPage, etc.)
├── Pages/               # Páginas da aplicação
│   ├── DashboardPage.tsx
│   ├── vehicles/        # CRUD de veículos
│   └── dealers/         # CRUD de concessionárias
├── Schemas/             # Schemas de validação Yup
├── Services/            # Camada de API (apiClient, vehicles, dealers, queries)
├── Utils/               # Utilitários (masks, validators, constants, domain)
├── App.tsx              # Componente raiz com rotas
└── main.tsx             # Entry point
```

## Pré-requisitos

- **Node.js 22+** (recomendado usar via nvm/fnm)
- **npm** ou **pnpm**
- Backend rodando em `http://localhost:8080` (ver `.env.example`)

## Inicialização

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd vehicle-dealership-frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
pnpm install
```

### 3. Configure variáveis de ambiente

Copie o arquivo de exemplo e ajuste se necessário:

```bash
cp .env.example .env
```

O arquivo `.env` deve conter:

```env
VITE_API_BASE_URL=http://localhost:8080
```

> **Nota:** Se o backend estiver em outra porta/host, atualize `VITE_API_BASE_URL`.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção (TypeScript + Vite) |
| `npm run lint` | Executa ESLint |
| `npm run preview` | Preview local do build de produção |

## Docker

### Build da imagem

```bash
docker build -t vehicle-dealership-frontend .
```

### Executar container

```bash
docker run -p 80:80 vehicle-dealership-frontend
```

A aplicação ficará disponível na porta 80 do host.

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_BASE_URL` | URL base da API backend | `http://localhost:8080` |

## Funcionalidades Principais

- **Dashboard** - Visão geral
- **Veículos** - Listagem, cadastro, edição, detalhes e exclusão
- **Concessionárias** - Listagem, cadastro, edição, detalhes e exclusão
- **Validação de formulários** - Com Yup + React Hook Form
- **Máscaras de input** - CPF, CNPJ, telefone, CEP, placa, ano, valor
- **Busca de CEP** - Integração ViaCEP
- **Notificações** - Toasts de sucesso/erro
- **Loading states** - Feedback visual durante requisições
- **Confirmação de ações** - Modal de confirmação para exclusões

## Convenções de Código

- **TypeScript strict mode** habilitado
- **ESLint** com regras recomendadas para React + TypeScript
- **Componentes funcionais** com hooks
- **Custom hooks** para lógica de páginas (`use*Page`)
- **Services** para chamadas de API isoladas
- **Schemas Yup** para validação centralizada

## Deploy

O build de produção gera arquivos estáticos na pasta `dist/`, prontos para serem servidos por qualquer servidor web (Nginx, Apache, Vercel, Netlify, AWS S3 + CloudFront, etc.).

O `Dockerfile` incluído faz build multi-stage e serve via Nginx na porta 80.