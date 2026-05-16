# Especificação Técnica — Escala de Porteiros 2026 (Provisória)

Documento de referência da versão **provisória** da escala (17/05/2026 a 31/12/2026), válida enquanto durar a reforma do salão. Use este documento para entender as regras de negócio implementadas e para solicitar manutenções futuras.

## 1. Visão geral

Aplicação web responsiva (mobile-first) para **visualização** da escala de porteiros da Congregação Cristã no Brasil — Jardim São Luiz (Barueri/SP), durante o período em que o salão está em reforma.

> **Diferença fundamental em relação à versão original:** nesta versão, a escala é **estática** (pré-computada e embutida no código), não é gerada por algoritmo em tempo de execução. Isso garante reprodutibilidade e estabilidade durante o período provisório.

## 2. Origem da sequência de irmãos

A sequência de irmãos foi **transplantada** da escala original ([`escala-irmaos-2026-mar`](https://github.com/flaviocom/escala-irmaos-2026-mar)) seguindo este protocolo:

1. **Ponto de partida:** slot `03/05/2026 (Dom) Noite` do site original (inclusive).
2. **Sequência limpa:** o slot Santa Ceia do original (07/06/2026) é **pulado** — não consome índice na sequência.
3. **Mapeamento 1-para-1:** cada grupo de irmãos da sequência original é alocado para o próximo slot disponível do novo site (na ordem temporal).
4. **Remoção do Thiago:** quando o irmão Thiago aparece em um grupo da sequência original, ele é removido — o slot resultante fica com **2 irmãos** em vez de 3.

## 3. Regras de negócio

### 3.1. Estrutura da escala

| Período | Detalhe |
|---|---|
| **Início** | 17/05/2026 |
| **Fim** | 31/12/2026 |
| **Capacidade padrão** | 3 porteiros por turno |
| **Capacidade especial** | 2 porteiros (quando Thiago apareceria) |

### 3.2. Dias e turnos

- **Terça-feira** → Noite (semanalmente)
- **Sexta-feira** → Noite (semanalmente)
- **Domingo** → Manhã, **alternado** a cada 14 dias começando em 17/05/2026
  - Domingos ativos: 17/05, 31/05, 14/06, 28/06, 12/07, 26/07, 09/08, 23/08, 06/09, 20/09, 04/10, 18/10, 01/11, 15/11, 29/11, 13/12, 27/12

### 3.3. Exceções

- **16/08/2026 (domingo)** → Santa Ceia, sem porteiros escalados.

### 3.4. Irmãos ativos (15)

Adilson · Carlos Henrique · Donizete · Eduardo · Elson · Flavio · Isac · Leandro · Lucas · Luis Henrique · Luiz Felipe · Luíz Cezar · Marcos · Vicente · Williams

> **Sem restrições individuais nesta versão.** Qualquer irmão pode ser escalado em qualquer dia/turno.

### 3.5. Slots com 2 irmãos (Thiago removido)

10 slots totais, distribuídos ao longo do período:

| Data | Turno | Irmãos |
|---|---|---|
| 19/05/2026 (Ter) | Noite | Williams, Vicente |
| 31/05/2026 (Dom) | Manhã | Luis Henrique, Luiz Felipe |
| 03/07/2026 (Sex) | Noite | Williams, Donizete |
| 14/07/2026 (Ter) | Noite | Williams, Lucas |
| 18/08/2026 (Ter) | Noite | Williams, Donizete |
| 01/09/2026 (Ter) | Noite | Luíz Cezar, Marcos |
| 18/10/2026 (Dom) | Manhã | Williams, Flavio |
| 30/10/2026 (Sex) | Noite | Vicente, Donizete |
| 01/12/2026 (Ter) | Noite | Williams, Isac |
| 15/12/2026 (Ter) | Noite | Flavio, Isac |

## 4. Interface (UX/UI)

A UX foi **100% preservada** da versão original. Mantidos:

- **Design System** com tokens CSS (cores, espaçamentos, tipografia, bordas)
- **Sidebar fixa** no desktop / **Bottom Sheet** no mobile
- **Sticky headers** de mês no scroll
- **Badges visuais** para turnos (Manhã = âmbar, Noite = índigo, Santa Ceia = alerta)
- **Filtros avançados:** por irmão, mês, data (busca + range)
- **Filtros rápidos:** Próximos 15 dias, Esta Semana, Este Mês
- **"Minha Escala":** persistência via `localStorage` para acesso rápido aos turnos do próprio irmão
- **Auto-scroll** para o turno mais próximo na abertura
- **Exportação:** geração de imagem otimizada para envio no WhatsApp (`html-to-image`)
- **Validação automática:** aba dedicada conferindo a integridade dos dados

### 4.1. Indicador visual de "PROVISÓRIA"

No cabeçalho (desktop e mobile), abaixo do título principal, há um **badge âmbar** com o texto **"⚠ Provisória"**. Ao passar o mouse sobre o badge, o tooltip exibe **"Enquanto durar a reforma"**.

No cabeçalho da imagem exportada para WhatsApp, o texto completo é exibido inline: `JD. SÃO LUIZ · 2026 · PROVISÓRIA · ENQUANTO DURAR A REFORMA`.

## 5. Validações automáticas

A aba **"Validação"** confere automaticamente:

1. ✓ Período: 17/05/2026 a 29/12/2026 (último slot real)
2. ✓ Dias e turnos permitidos (Ter Noite, Sex Noite, Dom Manhã, Santa Ceia)
3. ✓ Domingos alternados a cada 14 dias
4. ✓ Santa Ceia em 16/08/2026 (sem porteiros)
5. ✓ Cada turno com 2 ou 3 irmãos
6. ✓ Thiago não aparece em nenhum turno
7. ✓ Sem repetição de irmão no mesmo dia

## 6. Stack tecnológica

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript 5.8 |
| Framework | React 18.3 |
| Build | Vite 7 |
| Estilização | Tailwind CSS 3.4 + CSS Variables |
| Datas | date-fns (locale `pt-BR`) |
| Ícones | lucide-react |
| Exportação | html-to-image |
| Deploy | Vercel |

## 7. Como regerar a escala (caso necessário)

Se for preciso ajustar a sequência (por exemplo, mudar o ponto de partida ou as regras de calendário), o script de geração está documentado no `AI_MASTER_LOG.md`. A nova escala substituirá o conteúdo de `SCHEDULE_DATA` em `src/utils/scheduler.ts`.

---

*Documento atualizado em 16/05/2026 — versão provisória do projeto.*
