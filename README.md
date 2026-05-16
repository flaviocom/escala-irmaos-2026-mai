# Escala de Porteiros — JD. São Luiz 2026 (Provisória)

> Versão provisória da escala de porteiros da Congregação Cristã no Brasil — Jardim São Luiz (Barueri/SP), válida enquanto durar a reforma. Período: **17/05/2026 a 31/12/2026**.

Aplicação web responsiva (mobile-first) para visualização, filtragem e exportação da escala. Não há geração automática — os dados são pré-computados com base na sequência da escala original ([escala-irmaos-2026-mar](https://github.com/flaviocom/escala-irmaos-2026-mar)), transplantada para a nova malha de datas dos cultos durante a reforma.

## 📋 Regras de negócio desta versão

### Período
- **Início:** 17/05/2026 (domingo)
- **Fim:** 31/12/2026

### Dias e turnos de culto
- **Terça-feira** → Noite
- **Sexta-feira** → Noite
- **Domingo** → Manhã, **alternado** quinzenalmente (17/05 ✓, 24/05 ✗, 31/05 ✓, ...)

### Santa Ceia
- **16/08/2026** — sem porteiros escalados (única no período)

### Irmãos
- 15 irmãos ativos (Thiago foi removido nesta versão)
- **Sem restrições** individuais nesta fase provisória
- Onde Thiago apareceria na sequência original, o slot fica com **2 irmãos** (em vez de 3)

### Composição final
| Tipo de slot | Quantidade |
|---|---|
| Turnos com 3 irmãos | 72 |
| Turnos com 2 irmãos (Thiago removido) | 10 |
| Santa Ceia (sem porteiros) | 1 |
| **Total** | **83** |

## 🛠️ Stack técnica

- **React 18.3** + **TypeScript 5.8**
- **Vite 7** (build)
- **Tailwind CSS 3.4** + CSS variables (Design System)
- **date-fns** (manipulação de datas, locale `pt-BR`)
- **lucide-react** (ícones)
- **html-to-image** (exportação para WhatsApp)

## 🚀 Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
# → abre em http://127.0.0.1:5173

# 3. Build de produção
npm run build

# 4. Preview do build
npm run preview
```

## 📁 Estrutura do projeto

```
src/
├── assets/              Imagens (logo CCB)
├── components/          Componentes da UI
│   ├── DateSearch.tsx       Filtro por data
│   ├── MultiSelect.tsx      Filtro multi-seleção (Irmão/Mês)
│   ├── ScheduleTable.tsx    Tabela principal de exibição
│   ├── StatsView.tsx        Aba de estatísticas
│   └── ValidationView.tsx   Aba de validação (integridade dos dados)
├── types/
│   └── scheduler.ts         Tipos + lista de irmãos
├── utils/
│   ├── scheduler.ts         Dados estáticos da escala + validação
│   └── export.ts            Exportação como imagem (WhatsApp)
├── App.tsx                  Componente raiz (sidebar, header, filtros)
├── main.tsx                 Entry point
└── index.css                Estilos globais + tokens
```

## ✨ Funcionalidades

- 📅 **Visualização** em lista (mobile) ou tabela (desktop)
- 🔍 **Filtros** por irmão, mês, data e busca textual
- 👤 **Minha Escala** — salva o nome do irmão no `localStorage` para acesso rápido
- ⚡ **Atalhos** — Próximos 15 dias, Esta Semana, Este Mês
- 📊 **Estatísticas** — distribuição de turnos por irmão
- 🛡️ **Validação** — confere a integridade dos dados
- 📲 **Exportação** — gera imagem otimizada para envio no WhatsApp

## 🤖 Memória do projeto

Toda alteração relevante é registrada em [`AI_MASTER_LOG.md`](./AI_MASTER_LOG.md).

## 📜 Origem

Este projeto é uma adaptação de [`escala-irmaos-2026-mar`](https://github.com/flaviocom/escala-irmaos-2026-mar). A especificação técnica original está em [`ESPECIFICACAO_PROJETO.md`](./ESPECIFICACAO_PROJETO.md).
