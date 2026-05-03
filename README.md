# Portfólio — Landing Page

Landing page de portfólio construída com foco em performance, responsividade e animações sutis no scroll. Inclui seções de apresentação, sobre, tecnologias, projetos e contato.

## Tecnologias utilizadas

- React + TypeScript
- Vite (build e dev server)
- Tailwind CSS (estilização utilitária)
- Framer Motion (animações e efeitos no scroll)

## Estrutura da página

- Header com navegação por âncoras
- Hero (apresentação + foto)
- Sobre
- Tecnologias (cards)
- Projetos (cards)
- Contato
- Footer

## Animações

- Revelação das seções e cards ao entrar na viewport (scroll)
- Barra de progresso de leitura no topo (progresso do scroll)

## Como rodar o projeto

Requisitos:

- Node.js (recomendado: LTS)

Instalar dependências:

```bash
npm install
```

Ambiente de desenvolvimento:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Pré-visualização do build:

```bash
npm run preview
```

## Personalização rápida

- Conteúdo da página: [src/App.tsx](src/App.tsx)
- Estilos base / Tailwind: [src/index.css](src/index.css)
- Config do Tailwind: [tailwind.config.js](tailwind.config.js)
- Foto do hero: [src/assets/hero.png](src/assets/hero.png)
