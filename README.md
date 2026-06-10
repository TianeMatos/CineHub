# 🎞️ CineHub

Aplicação Full Stack para descoberta de filmes e séries utilizando a API do TMDB.
> 🚧 **Status do Projeto:** Em desenvolvimento. Adicionando novas funcionalidades continuamente.

## Visão Geral

O CineHub é uma plataforma de catálogo de entretenimento focada em performance, componentização limpa e gerenciamento de estado eficiente. A aplicação separa o ecossistema em duas camadas totalmente independentes:

- `frontend/` — App React + Vite com consumo de API via Axios
- `backend/` — Servidor Express que consulta o TMDB e utiliza Redis para cache

## Funcionalidades Principais

- Exibe mídia trending de filmes e séries
- Lista de títulos melhor avaliados
- Páginas de detalhe e recomendações similares
- Filtros de descoberta por gênero e ordenação
- Cache Redis para reduzir chamadas à API do TMDB
- Tratamento de erros no backend e mensagens de carregamento no frontend

## Tecnologias Usadas

### Frontend
* React 19 (com React Router)
* Vite
* Tailwind CSS (Estilização responsiva e fluida)
* Lucide React (Pacote de ícones)
* Embla Carousel (Carrosséis nativos de alta performance)

### Backend
* Node.js + Express 
* Redis (Camada de Cache em memória)
* Axios

### API Externa
* TMDB (The Movie Database)

## Estrutura do Projeto

```
cinehub/ 
├── backend/ 
│ ├── src/ 
│ │ ├── config/ 
│ │ ├── controllers/ 
│ │ ├── routes/ 
│ │ ├── services/ 
│ │ ├── middlewares/ 
│ │ ├── utils/ 
│ │ ├── app.js 
│ │ └── server.js 
│ └── package.json 
|
├── frontend/ 
│ ├── src/ 
│ │ ├── components/ 
│ │ ├── hooks/ 
│ │ ├── pages/ 
│ │ ├── services/ 
│ │ ├── styles/ 
│ │ ├── utils/ 
│ │ ├── App.jsx
│ │ ├── main.jsx 
│ │ └── router.jsx 
│ └── package.json 
|
└── README.md
```

## Pré-requisitos

- Node.js instalado
- npm ou yarn
- Redis em execução localmente ou remoto
- Chave de API TMDB válida

## Instalação e Execução

### 1. Backend

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as variáveis:

```env
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=seu_token_tmdb_aqui
REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
SERVER_PORT=
```

4. Inicie o servidor:

```bash
npm run dev
```

### 2. Frontend

1. Entre na pasta do frontend:

```bash
cd frontend
```

2. Instale dependências:

```bash
npm install
```

3. Configure a URL da API no `.env` do frontend (crie se necessário):

```env
VITE_API_BASE_URL=http://localhost:3000/api/media
```

4. Inicie o app React:

```bash
npm run dev
```

## Endpoints Disponíveis

O backend expõe os seguintes endpoints:

* `GET /api/media/:mediaType/trendings` — Lista leve de mídias em alta.
* `GET /api/media/:mediaType/topRated` — Conteúdos mais bem avaliados.
* `GET /api/media/:mediaType/discover` — Filtros de busca e ordenação por gênero.
* `GET /api/media/:mediaType/genres` — Lista de gêneros disponíveis.
* `GET /api/media/:mediaType/:id/details` — Detalhes aprofundados da mídia selecionada.
* `GET /api/media/:mediaType/:id/similar` — Carrossel de títulos relacionados.
* `GET /api/media/:mediaType/:id/trailer` — Chave de streaming do YouTube para reprodução de trailers.
* `GET /api/media/:mediaType/:id/credits` — Equipe técnica (Direção) e elenco principal.

> O parâmetro `:mediaType` aceita estritamente `movie` ou `tv`.

## Dicas

- Garanta que o Redis esteja acessível antes de iniciar o backend.
- Use `SERVER_PORT` no backend e `VITE_API_BASE_URL` no frontend para ajustar portas ou hosts.
- O backend prepara os dados com URLs completas para imagens do TMDB.

## Próximos Passos 

- Implementar busca por termo
- Adicionar autenticação de usuário
- Criar paginação dinâmica avançada
- Página de favoritos

## Objetivo do Projeto

Este projeto foi criado para praticar e demonstrar conhecimentos em desenvolvimento Full Stack com JavaScript, incluindo integração entre React, Node.js, APIs externas e estratégias de cache utilizando Redis.
