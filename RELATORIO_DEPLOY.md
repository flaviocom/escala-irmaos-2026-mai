# Relatório de Deploy — escala-irmaos-2026-mai

**Data/hora:** 16/05/2026
**Executor:** Cowork (Claude)
**Sessão:** Deploy provisório 2026-mai

---

## 🎯 Resultado geral

✅ **Sucesso com ressalvas leves** (A13 e A15 parcialmente validados — vide observações)

## 🔗 URLs entregues

| Recurso | URL |
|---|---|
| Repositório GitHub | https://github.com/flaviocom/escala-irmaos-2026-mai |
| Site público (URL canônica) | https://escala-irmaos-2026-mai.vercel.app |
| Deployment imutável | https://escala-irmaos-2026-5kfwk3e1u-flaviocoms-projects.vercel.app |
| Dashboard Vercel | https://vercel.com/flaviocoms-projects/escala-irmaos-2026-mai |

## 🛠️ Tecnologias confirmadas

- React 18.3.1 + TypeScript 5.8 + Vite 7.3
- Tailwind CSS 3.4 (breakpoints `sm`, `md`, `lg`)
- Zustand, React Router, date-fns, framer-motion, html-to-image
- Build: 2503 módulos · JS 235,13 KB · CSS 33,51 KB · 3,94 s

## 📋 Checklist visual local (Fase 1.5)

Validação local realizada via DOM Snapshot do dev server `http://127.0.0.1:5173/`:

| # | Check | Status |
|---|---|---|
| V1.1 | Header "Escala Porteiros" + "JD. SÃO LUIZ · 2026" | ✅ |
| V1.2 | Badge âmbar "⚠ Provisória" | ✅ |
| V1.3 | Tooltip "Enquanto durar a reforma" | ✅ |
| V1.4 | 17/05/2026 Dom Manhã → Adilson, Luíz Cezar, Marcos | ✅ |
| V1.5 | 19/05/2026 Ter Noite → Williams, Vicente (2 nomes) | ✅ |
| V1.6 | 16/08/2026 marcado como SANTA CEIA, sem irmãos | ✅ |
| V1.7 | Aba "Validação" — 7 checks aprovados | ✅ |
| V1.8 | Aba "Estatísticas" — 15 irmãos, sem Thiago | ✅ |

## 🧪 Auditoria de produção (Fase 4.1)

URL auditada: **https://escala-irmaos-2026-mai.vercel.app/**

| # | Verificação | Resultado | Status |
|---|---|---|---|
| A1 | Site abre sem erro | HTTP 200 | ✅ |
| A2 | Title navegador | "Escala Porteiros - JD. São Luiz 2026 (Provisória)" | ✅ |
| A3 | Badge "⚠ Provisória" | Visível, span no header | ✅ |
| A4 | Tooltip do badge | `title="Enquanto durar a reforma"` | ✅ |
| A5 | 17/05 Dom Manhã | Adilson, Luíz Cezar, Marcos | ✅ |
| A6 | 19/05 Ter Noite | Williams, Vicente (2 irmãos) | ✅ |
| A7 | 31/05 Dom Manhã | Luis Henrique, Luiz Felipe (2 irmãos) | ✅ |
| A8 | 16/08 SANTA CEIA | Badge vermelha, sem irmãos | ✅ |
| A9 | 29/12 Ter Noite | Leandro, Lucas, Luis Henrique | ✅ |
| A10 | Aba Validação — 7 checks | Todos APROVADOS | ✅ |
| A11 | Estatísticas — 15 irmãos sem Thiago | 15 nomes únicos, Thiago = 0 | ✅ |
| A12 | Filtro "Próximos 15 dias" | Funciona (16/05 - 30/05) | ✅ |
| A13 | Filtro por irmão "Adilson" | Dropdown "Irmão" existe; não cliquei dentro do menu | ⏸ |
| A14 | Botão exportar WhatsApp | "Enviar Escala p/ WhatsApp" presente | ✅ |
| A15 | Layout responsivo mobile | Tailwind `sm`/`md`/`lg` configurado; resize de janela não pegou no Edge via Chrome MCP | ⏸ |
| A16 | Sem ref ao site antigo (escala-irmaos-2026-mar) | 0 ocorrências | ✅ |
| A17 | Nenhuma menção a "Thiago" | 0 ocorrências em todo o `body.innerText` | ✅ |

**Total:** 15 ✅ aprovados · 2 ⏸ parcialmente validados · 0 ❌ falhas.

## 📊 Validação amostral (Fase 4.2)

Amostragem cruzada entre site publicado e relatório `RELATORIO_ESCALA_COMPLETA.md`:

| Turno | Irmãos no site | Bate? |
|---|---|---|
| 17/05/2026 Dom Manhã | Adilson, Luíz Cezar, Marcos | ✅ |
| 19/05/2026 Ter Noite | Williams, Vicente | ✅ |
| 31/05/2026 Dom Manhã | Luis Henrique, Luiz Felipe | ✅ |
| 14/08/2026 Sex Noite | Williams, Donizete | ✅ |
| 16/08/2026 Dom | SANTA CEIA (sem irmãos) | ✅ |
| 29/12/2026 Ter Noite | Leandro, Lucas, Luis Henrique | ✅ |

**Total: 83 turnos no site** (82 turnos com porteiros + 1 Santa Ceia) — bate exatamente com a especificação do projeto.

## ⏱ Tempo total

| Fase | Duração aprox. |
|---|---|
| Fase 0 (Pré-voo) | 1 min |
| Fase 1 (Preparação local — `npm install` demorou 23 min) | ~28 min |
| Fase 2 (GitHub) | 2 min |
| Fase 3 (Vercel) | 3 min |
| Fase 4 (Auditoria) | 6 min |
| **Total** | **~40 min** |

## ⚠️ Issues encontrados (todos contornados)

1. **Caminho de origem diverge do runbook.** O ZIP veio extraído em `D:\Antigravity\Meus-Projetos\escala-irmaos-2026-maio\files (1)\escala-irmaos-2026-mai\escala-irmaos-2026-mai\` (nesting triplo, com espaço e parênteses). **Mitigação:** projeto movido para `D:\Antigravity\Meus-Projetos\escala-irmaos-2026-mai\` (caminho limpo, igual ao runbook). Autorização obtida do usuário via prompt.
2. **GitHub CLI (`gh`) não instalado.** **Mitigação:** seguido o Caminho B do runbook (criação do repo via navegador), conforme decisão do usuário. Repo criado em `flaviocom/escala-irmaos-2026-mai`.
3. **`npm install` extremamente lento (23 min).** Provável causa: Node v25.8.0 e npm 11.11.0 (versões muito recentes) com algum gargalo de I/O ou compilação de binários. Não impediu o build, mas vale considerar usar Node 20 LTS em deploys futuros.
4. **`resize_window` não redimensionou a janela do Edge** via Chrome MCP. **Mitigação:** responsividade confirmada indiretamente via inspeção CSS (classes Tailwind `sm`/`md`/`lg` ativas).
5. **Warning de browserslist desatualizada** durante o `vite build`. Não bloqueia. Recomendado rodar `npx update-browserslist-db@latest` numa próxima atualização do projeto.

## ✅ Confirmações-chave

- **Repositório `flaviocom/escala-irmaos-2026-mai`** criado e populado (35 arquivos, commit `4f3973e`).
- **Deploy Vercel** completo em ~40 s. Status `Ready` com domínio canônico ativo.
- **Vercel.json** já configurado no projeto: `buildCommand: vite build --base=/`, `outputDirectory: dist`, `framework: vite`, com SPA rewrite para `index.html`.
- **Build size matches spec:** JS 235 KB · CSS 33 KB · 2503 módulos transformados.
- **Pipeline reproduzível:** push em `main` → Vercel rebuilds automaticamente.

---

## 📎 Próximos passos sugeridos

1. Distribuir a URL `https://escala-irmaos-2026-mai.vercel.app` aos irmãos via WhatsApp.
2. Validar com 1–2 porteiros que veem suas escalas corretamente em mobile real.
3. Considerar configurar domínio próprio (ex.: `escala-provisoria.suaigreja.com.br`) via Vercel → Domains.
4. Atualizar `browserslist-db` no próximo commit (`npx update-browserslist-db@latest`).
5. Se o período provisório se estender, manter este repo independente do `escala-irmaos-2026-mar` para evitar conflitos.

---

*Relatório gerado automaticamente pelo Cowork em 16/05/2026.*
