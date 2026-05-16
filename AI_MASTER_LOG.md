# 🤖 AI_MASTER_LOG — Escala de Porteiros 2026 (Provisória)

Este arquivo é a **memória viva do projeto**. Toda alteração relevante feita com auxílio de IA deve ser registrada aqui, em ordem cronológica reversa (mais recente no topo).

---

## 📌 Sessão 2 — 16/05/2026 — Deploy em produção (GitHub + Vercel)

### 1. Solicitação

Executar runbook completo de deploy: extrair projeto local, validar build, subir no GitHub (conta `flaviocom`), publicar na Vercel e auditar o site final contra checklist objetivo de 17 critérios + validação amostral cruzada com `RELATORIO_ESCALA_COMPLETA.md`.

### 2. Ações executadas

#### 2.1. Fase 0 — Pré-voo (validação de ambiente)
- Confirmado git 2.53, node v25.8.0, npm 11.11.0
- Constatado que GitHub CLI (`gh`) **não está instalado** → adotado fluxo via navegador
- Detectada divergência de caminho: projeto extraído em `…\escala-irmaos-2026-maio\files (1)\escala-irmaos-2026-mai\escala-irmaos-2026-mai\` (nesting triplo)

#### 2.2. Fase 1 — Preparação local
- **Arquivo movido:** projeto realocado para `D:\Antigravity\Meus-Projetos\escala-irmaos-2026-mai\` (caminho limpo)
- `npm install` rodou em background — **levou 23 minutos** (lentidão atribuída a Node v25 + npm 11)
- `npm run build` ✓ 2503 módulos transformados em 3,94 s
  - `dist/index.html` 0,61 kB
  - `dist/assets/index-DKX_4KQy.css` 33,51 kB
  - `dist/assets/index-kO2RdLZD.js` 235,13 kB
- `npm run dev` em background → HTTP 200 em `http://127.0.0.1:5173/`
- Validação visual via DOM Snapshot: checks V1.1, V1.2, V1.4, V1.5 confirmados

#### 2.3. Fase 2 — GitHub
- `git init` + `git branch -M main`
- `git config user.email "brflaviooliveira@gmail.com"` (override local do email default)
- `git add . && git commit -m "feat: versao inicial - escala provisoria 17/05 a 31/12/2026"` → 35 arquivos, 6.590 inserções, commit `4f3973e`
- Repo criado via navegador em `flaviocom/escala-irmaos-2026-mai` (Public, sem README inicial)
- `git remote add origin` + `git push -u origin main` → branch `main` rastreando `origin/main`
- Validação via API: 15 arquivos + pasta `src/` no root

#### 2.4. Fase 3 — Vercel
- Importação via `https://vercel.com/new`: Vercel detectou framework Vite automaticamente
- Deploy iniciado e finalizado em ~40 s, status `Ready`
- **URL canônica:** https://escala-irmaos-2026-mai.vercel.app
- URL deployment imutável: `escala-irmaos-2026-5kfwk3e1u-flaviocoms-projects.vercel.app`

#### 2.5. Fase 4 — Auditoria em produção
- 15 critérios aprovados, 2 parcialmente validados (A13 filtro irmão e A15 mobile), 0 falhas
- Validação amostral cruzada de 6 turnos contra o relatório → 100% bate

#### 2.6. Fase 5 — Relatório
- Criado `RELATORIO_DEPLOY.md` na raiz do projeto

### 3. Regras de negócio aprendidas / confirmadas

- A escala provisória contém exatamente **83 turnos** (82 com porteiros + 1 Santa Ceia)
- 15 irmãos ativos (Thiago removido conforme Sessão 1)
- 16/08/2026 é Santa Ceia (sem porteiros escalados) — confirmado em produção
- Primeiro turno: 17/05/2026 Dom Manhã (Adilson, Luíz Cezar, Marcos)
- Último turno: 29/12/2026 Ter Noite (Leandro, Lucas, Luis Henrique)
- O título da página inclui o sufixo "(Provisória)" e há badge âmbar com tooltip `Enquanto durar a reforma`
- `vercel.json` no projeto já fornece SPA rewrite para todas as rotas → essencial para React Router funcionar em produção

### 4. Arquivos alterados/criados nesta sessão

- ✅ Criado: `RELATORIO_DEPLOY.md` (relatório estruturado da Fase 5)
- ✅ Atualizado: `AI_MASTER_LOG.md` (esta entrada — Sessão 2)
- ⚙ Gerado por build (não versionado): `node_modules/`, `dist/`
- 📌 Sem alterações no código-fonte (`src/`, `package.json`, configs) — runbook proíbe modificação durante deploy

### 5. Próximos passos

1. Divulgar a URL `https://escala-irmaos-2026-mai.vercel.app` aos porteiros via WhatsApp
2. Validar A13 (filtro por irmão "Adilson") e A15 (mobile real) com 1–2 testadores
3. Considerar domínio próprio em `vercel.com → Domains`
4. Rodar `npx update-browserslist-db@latest` no próximo commit
5. Avaliar downgrade para Node 20 LTS para acelerar futuros `npm install` (de 23 min para ~2 min)
6. Configurar GitHub Actions com check de build em PRs (opcional)

---

---

## 📌 Sessão 1 — 16/05/2026 — Criação do projeto provisório

### 1. Solicitação

Criar um novo site (separado) com a escala de porteiros do **período provisório** durante a reforma do salão da CCB Jd. São Luiz, sem alterar o projeto original [`escala-irmaos-2026-mar`](https://github.com/flaviocom/escala-irmaos-2026-mar).

**Requisitos definidos pelo usuário:**

| Item | Decisão |
|---|---|
| Período | 17/05/2026 → 31/12/2026 |
| Dias de culto | Terça (Noite), Sexta (Noite), Domingo Manhã (alternado quinzenal) |
| Primeiro domingo ativo | 17/05/2026 |
| Santa Ceia | 16/08/2026 (sem porteiros escalados) |
| Irmãos | Remover Thiago (15 ativos no total) |
| Restrições | Nenhuma — todos os irmãos sem restrição individual |
| Slots com Thiago removido | Ficam com **2 irmãos** em vez de 3 |
| Sequência de irmãos | "Transplante" da escala original a partir de 03/05/2026 (Dom) Noite |
| Santa Ceia do original (07/06) | Pulada na sequência (não consome índice) — **Opção A** |
| UX | 100% idêntica ao projeto original |
| Repositório | `escala-irmaos-2026-mai` |
| Título no header | "Escala Porteiros - JD. São Luiz 2026 (Provisória, enquanto durar a reforma)" |

### 2. Ações executadas

#### 2.1. Extração da sequência original
- Clonado o repositório `escala-irmaos-2026-mar`
- Algoritmo original (`generateSchedule()`) reimplementado em Node.js puro
- Executada simulação determinística para extrair os 144 slots da escala original a partir do índice de `03/05/2026 Noite`
- Aplicado filtro "Opção A": removido o slot Santa Ceia (07/06/2026), sobrando **143 slots disponíveis** para mapeamento

#### 2.2. Geração da nova malha de datas
- Gerada lista de slots conforme novas regras:
  - Terças e Sextas semanais à Noite
  - Domingos alternados quinzenais à Manhã, ancorados em 17/05/2026
  - Exceção: 16/08/2026 (Santa Ceia)
- Total: **83 slots no novo site** (82 a preencher + 1 Santa Ceia)

#### 2.3. Mapeamento 1-para-1
- Cada novo slot recebeu o grupo de irmãos do próximo slot disponível da sequência original
- Quando o grupo continha Thiago, ele foi removido (slot resultante com 2 irmãos)
- **Resultado:** 72 slots com 3 irmãos · 10 slots com 2 irmãos · 1 Santa Ceia

#### 2.4. Arquivos criados/modificados

| Arquivo | Status | Mudança |
|---|---|---|
| `src/types/scheduler.ts` | 🔄 reescrito | Removido Thiago; todas as `constraints` zeradas (sem restrições) |
| `src/utils/scheduler.ts` | 🔄 reescrito | Substituído o gerador dinâmico pela constante estática `SCHEDULE_DATA` (83 slots) + função `getSchedule()` + `runValidation()` adaptado |
| `src/App.tsx` | ✏️ editado | Import trocado para `getSchedule`; subtítulo do header (desktop e mobile) ganhou badge `⚠ Provisória` com tooltip "Enquanto durar a reforma"; cabeçalho da imagem exportada exibe texto completo |
| `index.html` | 🔄 reescrito | Título e meta-description atualizados |
| `package.json` | 🔄 reescrito | Nome `escala-irmaos-2026-mai`; removidas dependências mortas do template YouWare (`cannon-es`, `gsap`, `matter-js`, `three`, `@youware/vite-plugin-react`) |
| `README.md` | 🔄 reescrito | Documentação completa da versão provisória |
| `ESPECIFICACAO_PROJETO.md` | 🔄 reescrito | Spec técnica atualizada |
| `AI_MASTER_LOG.md` | ✨ novo | Este arquivo (Regra 5) |
| `YOUWARE.md` | ❌ removido | Arquivo do template original, sem utilidade |
| `yw_manifest.json` | ❌ removido | Idem |
| `.github/workflows/deploy.yml` | ❌ removido | Era de GitHub Pages — deploy fica por conta da Vercel |
| `src/assets/youware-bg.png` | ❌ removido | Asset não utilizado |

### 3. Regras de negócio aprendidas

- A escala original é **determinística** (mesmo algoritmo, mesmo resultado): isso permitiu extrair a sequência de forma reproduzível.
- A "Santa Ceia do original" (07/06/2026) tem o array `assignedBrothers` vazio no algoritmo original — pulá-la na sequência (Opção A) evita um buraco no novo site.
- O irmão Williams tinha `fixedPerMonth: 3` no original — ao transplantar para a nova malha, essa garantia **não se mantém** (pode variar de mês para mês). Como o usuário definiu "sem restrições", isso é aceitável.
- O irmão Adilson tinha restrição `daysAllowed: [0]` (só Domingo) e `shiftsAllowed: ['NOITE']` no original. Na nova escala ele pode aparecer em Terças e Sextas — isso foi confirmado pelo usuário como aceitável.

### 4. Próximos passos

1. **Deploy inicial:**
   - Criar repositório `escala-irmaos-2026-mai` no GitHub (usuário `flaviocom`)
   - Push do código deste pacote
   - Conectar repositório à Vercel (import via dashboard)
   - Aguardar build automático
2. **Validação operacional:**
   - Abrir o site e checar a aba "Validação" (deve passar em todos os 7 checks)
   - Conferir manualmente os primeiros 5 turnos contra o mapeamento documentado
   - Testar exportação para WhatsApp em mobile
3. **Possíveis melhorias futuras:**
   - Painel administrativo para editar a escala sem precisar mexer no código
   - Notificação push 1 dia antes do turno (PWA)
   - Modo offline (Service Worker)

---

## 📜 Convenções deste log

- **🔄 reescrito:** o conteúdo do arquivo foi substituído integralmente
- **✏️ editado:** alterações pontuais via `str_replace`
- **✨ novo:** arquivo criado nesta sessão
- **❌ removido:** arquivo deletado nesta sessão
- Cada sessão deve ser anexada **no topo** do arquivo, mantendo o histórico imutável
