# SQL Playground | Brazilian Public Data

Interactive environment to practise SQL with real data from the Brazilian federal government's Transparency Portal. PostgreSQL runs straight in the browser via PGlite, with zero installation.

**[Open the playground](https://fexndev.github.io/sql-playground-br/)**

## Features

- **SQL editor** with Ctrl+Enter execution and query timing feedback
- **Tables with real data** from the Transparency Portal (federal government spending)
- **10 progressive challenges** to practise SQL from beginner to advanced
- **Schema explorer**: click a table in the sidebar to see its structure
- **Light/dark theme** toggle
- **100% client-side**: the PostgreSQL database runs in the browser with PGlite, no backend

## How it works

The project uses [PGlite](https://pglite.dev/) to run a full PostgreSQL database directly in the browser. Data loads automatically when the page opens, so you can run real SQL queries without a server or any installation.

## Data model

Table and column names keep the original Portuguese terms used by the Transparency Portal, so queries match the official data:

| Table | Content | Key columns |
|---|---|---|
| `gastos_governo` | Federal spending | `orgao` (government body), `funcao` (function), `valor_empenhado` (committed), `valor_pago` (paid), `ano` (year), `mes` (month) |
| `servidores` | Federal civil servants | `nome` (name), `cargo` (role), `orgao`, `uf` (state), `total_bruto` (gross pay), `total_liquido` (net pay) |
| `transferencias` | Transfers to municipalities | `uf`, `municipio` (municipality), `valor` (amount), `ano` |
| `emendas` | Parliamentary budget amendments | `autor` (author), `partido` (party), `area`, `uf`, `valor_pago` |

## Technologies

- HTML, CSS, JavaScript (no frameworks)
- PGlite (PostgreSQL in the browser via WebAssembly)
- GitHub Pages (hosting)

## Data sources

| Source | Data |
|---|---|
| [Portal da Transparência](https://portaldatransparencia.gov.br/) | Federal government spending |
