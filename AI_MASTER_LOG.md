# 🤖 AI_MASTER_LOG — Escala de Porteiros 2026 (Provisória)

Este arquivo é a **memória viva do projeto**. Toda alteração relevante feita com auxílio de IA deve ser registrada aqui, em ordem cronológica reversa (mais recente no topo).

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
