import { parseISO, format, getDay, isSameDay } from 'date-fns';
import { Shift, ShiftType, BROTHERS } from '../types/scheduler';

/**
 * ============================================================================
 * ESCALA PRÉ-COMPUTADA — Versão Provisória (17/05/2026 a 31/12/2026)
 * ============================================================================
 *
 * Esta escala foi gerada a partir da sequência de irmãos do site original
 * (escala-irmaos-2026-mar), começando em 03/05/2026 (Dom Noite) inclusive,
 * e transplantada para a nova malha de datas conforme as regras abaixo:
 *
 *   • Terças à Noite + Sextas à Noite (todas, semanalmente)
 *   • Domingos à Manhã, alternados (17/05 sim, 24/05 não, 31/05 sim, ...)
 *   • Santa Ceia: 16/08/2026 (sem porteiros escalados)
 *
 * Regras aplicadas ao "transplante":
 *   • A Santa Ceia do site original (07/06/2026) é PULADA na sequência —
 *     ela não consome um índice (Opção A combinada).
 *   • Quando Thiago aparece num grupo da sequência original, ele é removido
 *     e o slot do novo site fica com 2 irmãos (em vez de 3).
 *
 * Total: 83 turnos · 72 com 3 irmãos · 10 com 2 irmãos · 1 Santa Ceia.
 *
 * NÃO ALTERAR MANUALMENTE: este arquivo é dado, não código. Se precisar
 * regerar, use o script de geração documentado no AI_MASTER_LOG.md.
 * ============================================================================
 */

interface RawShift {
  id: string;
  date: string; // formato 'YYYY-MM-DD'
  type: ShiftType;
  assignedBrothers: string[];
}

const SCHEDULE_DATA: RawShift[] = [
  { id: 's-1', date: '2026-05-17', type: 'MANHÃ', assignedBrothers: ['adilson', 'luiz_cezar', 'marcos'] },
  { id: 's-2', date: '2026-05-19', type: 'NOITE', assignedBrothers: ['williams', 'vicente'] },
  { id: 's-3', date: '2026-05-22', type: 'NOITE', assignedBrothers: ['donizete', 'flavio', 'isac'] },
  { id: 's-4', date: '2026-05-26', type: 'NOITE', assignedBrothers: ['carlos_henrique', 'eduardo', 'elson'] },
  { id: 's-5', date: '2026-05-29', type: 'NOITE', assignedBrothers: ['leandro', 'lucas', 'adilson'] },
  { id: 's-6', date: '2026-05-31', type: 'MANHÃ', assignedBrothers: ['luis_henrique', 'luiz_felipe'] },
  { id: 's-7', date: '2026-06-02', type: 'NOITE', assignedBrothers: ['luiz_cezar', 'marcos', 'vicente'] },
  { id: 's-8', date: '2026-06-05', type: 'NOITE', assignedBrothers: ['donizete', 'flavio', 'isac'] },
  { id: 's-9', date: '2026-06-09', type: 'NOITE', assignedBrothers: ['adilson', 'carlos_henrique', 'eduardo'] },
  { id: 's-10', date: '2026-06-12', type: 'NOITE', assignedBrothers: ['leandro', 'lucas', 'luis_henrique'] },
  { id: 's-11', date: '2026-06-14', type: 'MANHÃ', assignedBrothers: ['elson', 'luiz_felipe', 'luiz_cezar'] },
  { id: 's-12', date: '2026-06-16', type: 'NOITE', assignedBrothers: ['marcos', 'vicente', 'carlos_henrique'] },
  { id: 's-13', date: '2026-06-19', type: 'NOITE', assignedBrothers: ['adilson', 'donizete', 'eduardo'] },
  { id: 's-14', date: '2026-06-23', type: 'NOITE', assignedBrothers: ['flavio', 'isac', 'leandro'] },
  { id: 's-15', date: '2026-06-26', type: 'NOITE', assignedBrothers: ['lucas', 'luis_henrique', 'elson'] },
  { id: 's-16', date: '2026-06-28', type: 'MANHÃ', assignedBrothers: ['luiz_felipe', 'luiz_cezar', 'marcos'] },
  { id: 's-17', date: '2026-06-30', type: 'NOITE', assignedBrothers: ['vicente', 'adilson', 'carlos_henrique'] },
  { id: 's-18', date: '2026-07-03', type: 'NOITE', assignedBrothers: ['williams', 'donizete'] },
  { id: 's-19', date: '2026-07-07', type: 'NOITE', assignedBrothers: ['williams', 'eduardo', 'flavio'] },
  { id: 's-20', date: '2026-07-10', type: 'NOITE', assignedBrothers: ['isac', 'leandro', 'elson'] },
  { id: 's-21', date: '2026-07-12', type: 'MANHÃ', assignedBrothers: ['williams', 'lucas'] },
  { id: 's-22', date: '2026-07-14', type: 'NOITE', assignedBrothers: ['luis_henrique', 'luiz_felipe', 'luiz_cezar'] },
  { id: 's-23', date: '2026-07-17', type: 'NOITE', assignedBrothers: ['marcos', 'vicente', 'carlos_henrique'] },
  { id: 's-24', date: '2026-07-21', type: 'NOITE', assignedBrothers: ['adilson', 'donizete', 'eduardo'] },
  { id: 's-25', date: '2026-07-24', type: 'NOITE', assignedBrothers: ['flavio', 'isac', 'leandro'] },
  { id: 's-26', date: '2026-07-26', type: 'MANHÃ', assignedBrothers: ['elson', 'lucas', 'luis_henrique'] },
  { id: 's-27', date: '2026-07-28', type: 'NOITE', assignedBrothers: ['luiz_felipe', 'luiz_cezar', 'marcos'] },
  { id: 's-28', date: '2026-07-31', type: 'NOITE', assignedBrothers: ['vicente', 'adilson', 'carlos_henrique'] },
  { id: 's-29', date: '2026-08-04', type: 'NOITE', assignedBrothers: ['donizete', 'flavio', 'isac'] },
  { id: 's-30', date: '2026-08-07', type: 'NOITE', assignedBrothers: ['eduardo', 'leandro', 'elson'] },
  { id: 's-31', date: '2026-08-09', type: 'MANHÃ', assignedBrothers: ['lucas', 'luis_henrique', 'luiz_felipe'] },
  { id: 's-32', date: '2026-08-11', type: 'NOITE', assignedBrothers: ['luiz_cezar', 'marcos', 'vicente'] },
  { id: 's-33', date: '2026-08-14', type: 'NOITE', assignedBrothers: ['williams', 'donizete'] },
  { id: 's-34', date: '2026-08-16', type: 'SANTA_CEIA', assignedBrothers: [] },
  { id: 's-35', date: '2026-08-18', type: 'NOITE', assignedBrothers: ['williams', 'carlos_henrique', 'flavio'] },
  { id: 's-36', date: '2026-08-21', type: 'NOITE', assignedBrothers: ['isac', 'eduardo', 'elson'] },
  { id: 's-37', date: '2026-08-23', type: 'MANHÃ', assignedBrothers: ['williams', 'leandro', 'lucas'] },
  { id: 's-38', date: '2026-08-25', type: 'NOITE', assignedBrothers: ['adilson', 'luis_henrique', 'luiz_felipe'] },
  { id: 's-39', date: '2026-08-28', type: 'NOITE', assignedBrothers: ['luiz_cezar', 'marcos'] },
  { id: 's-40', date: '2026-09-01', type: 'NOITE', assignedBrothers: ['vicente', 'donizete', 'carlos_henrique'] },
  { id: 's-41', date: '2026-09-04', type: 'NOITE', assignedBrothers: ['eduardo', 'elson', 'flavio'] },
  { id: 's-42', date: '2026-09-06', type: 'MANHÃ', assignedBrothers: ['isac', 'adilson', 'leandro'] },
  { id: 's-43', date: '2026-09-08', type: 'NOITE', assignedBrothers: ['lucas', 'luis_henrique', 'luiz_felipe'] },
  { id: 's-44', date: '2026-09-11', type: 'NOITE', assignedBrothers: ['luiz_cezar', 'marcos', 'vicente'] },
  { id: 's-45', date: '2026-09-15', type: 'NOITE', assignedBrothers: ['carlos_henrique', 'donizete', 'eduardo'] },
  { id: 's-46', date: '2026-09-18', type: 'NOITE', assignedBrothers: ['adilson', 'elson', 'flavio'] },
  { id: 's-47', date: '2026-09-20', type: 'MANHÃ', assignedBrothers: ['isac', 'leandro', 'lucas'] },
  { id: 's-48', date: '2026-09-22', type: 'NOITE', assignedBrothers: ['luis_henrique', 'luiz_felipe', 'luiz_cezar'] },
  { id: 's-49', date: '2026-09-25', type: 'NOITE', assignedBrothers: ['marcos', 'vicente', 'carlos_henrique'] },
  { id: 's-50', date: '2026-09-29', type: 'NOITE', assignedBrothers: ['adilson', 'donizete', 'eduardo'] },
  { id: 's-51', date: '2026-10-02', type: 'NOITE', assignedBrothers: ['flavio', 'isac', 'leandro'] },
  { id: 's-52', date: '2026-10-04', type: 'MANHÃ', assignedBrothers: ['williams', 'elson', 'lucas'] },
  { id: 's-53', date: '2026-10-06', type: 'NOITE', assignedBrothers: ['luis_henrique', 'luiz_felipe', 'luiz_cezar'] },
  { id: 's-54', date: '2026-10-09', type: 'NOITE', assignedBrothers: ['williams', 'marcos', 'vicente'] },
  { id: 's-55', date: '2026-10-13', type: 'NOITE', assignedBrothers: ['adilson', 'carlos_henrique', 'donizete'] },
  { id: 's-56', date: '2026-10-16', type: 'NOITE', assignedBrothers: ['williams', 'flavio'] },
  { id: 's-57', date: '2026-10-18', type: 'MANHÃ', assignedBrothers: ['eduardo', 'isac', 'leandro'] },
  { id: 's-58', date: '2026-10-20', type: 'NOITE', assignedBrothers: ['elson', 'lucas', 'luis_henrique'] },
  { id: 's-59', date: '2026-10-23', type: 'NOITE', assignedBrothers: ['luiz_felipe', 'luiz_cezar', 'marcos'] },
  { id: 's-60', date: '2026-10-27', type: 'NOITE', assignedBrothers: ['vicente', 'donizete'] },
  { id: 's-61', date: '2026-10-30', type: 'NOITE', assignedBrothers: ['carlos_henrique', 'flavio', 'eduardo'] },
  { id: 's-62', date: '2026-11-01', type: 'MANHÃ', assignedBrothers: ['isac', 'leandro', 'elson'] },
  { id: 's-63', date: '2026-11-03', type: 'NOITE', assignedBrothers: ['adilson', 'lucas', 'luis_henrique'] },
  { id: 's-64', date: '2026-11-06', type: 'NOITE', assignedBrothers: ['luiz_felipe', 'luiz_cezar', 'marcos'] },
  { id: 's-65', date: '2026-11-10', type: 'NOITE', assignedBrothers: ['vicente', 'donizete', 'carlos_henrique'] },
  { id: 's-66', date: '2026-11-13', type: 'NOITE', assignedBrothers: ['eduardo', 'flavio', 'elson'] },
  { id: 's-67', date: '2026-11-15', type: 'MANHÃ', assignedBrothers: ['adilson', 'isac', 'leandro'] },
  { id: 's-68', date: '2026-11-17', type: 'NOITE', assignedBrothers: ['lucas', 'luis_henrique', 'luiz_felipe'] },
  { id: 's-69', date: '2026-11-20', type: 'NOITE', assignedBrothers: ['luiz_cezar', 'marcos', 'vicente'] },
  { id: 's-70', date: '2026-11-24', type: 'NOITE', assignedBrothers: ['carlos_henrique', 'donizete', 'eduardo'] },
  { id: 's-71', date: '2026-11-27', type: 'NOITE', assignedBrothers: ['adilson', 'elson', 'flavio'] },
  { id: 's-72', date: '2026-11-29', type: 'MANHÃ', assignedBrothers: ['williams', 'isac'] },
  { id: 's-73', date: '2026-12-01', type: 'NOITE', assignedBrothers: ['williams', 'leandro', 'lucas'] },
  { id: 's-74', date: '2026-12-04', type: 'NOITE', assignedBrothers: ['luis_henrique', 'luiz_felipe', 'luiz_cezar'] },
  { id: 's-75', date: '2026-12-08', type: 'NOITE', assignedBrothers: ['williams', 'marcos', 'vicente'] },
  { id: 's-76', date: '2026-12-11', type: 'NOITE', assignedBrothers: ['adilson', 'carlos_henrique', 'donizete'] },
  { id: 's-77', date: '2026-12-13', type: 'MANHÃ', assignedBrothers: ['flavio', 'isac'] },
  { id: 's-78', date: '2026-12-15', type: 'NOITE', assignedBrothers: ['eduardo', 'elson', 'leandro'] },
  { id: 's-79', date: '2026-12-18', type: 'NOITE', assignedBrothers: ['lucas', 'luis_henrique', 'luiz_felipe'] },
  { id: 's-80', date: '2026-12-22', type: 'NOITE', assignedBrothers: ['luiz_cezar', 'marcos', 'vicente'] },
  { id: 's-81', date: '2026-12-25', type: 'NOITE', assignedBrothers: ['donizete', 'flavio', 'isac'] },
  { id: 's-82', date: '2026-12-27', type: 'MANHÃ', assignedBrothers: ['carlos_henrique', 'eduardo', 'elson'] },
  { id: 's-83', date: '2026-12-29', type: 'NOITE', assignedBrothers: ['leandro', 'lucas', 'luis_henrique'] },
];

/**
 * Retorna a escala completa pronta para uso na UI.
 * Converte as datas em string para objetos Date.
 */
export function getSchedule(): Shift[] {
  try {
    return SCHEDULE_DATA.map(raw => ({
      id: raw.id,
      date: parseISO(raw.date),
      type: raw.type,
      assignedBrothers: raw.assignedBrothers,
    }));
  } catch (err) {
    console.error('[scheduler] Falha ao carregar a escala estática:', err);
    return [];
  }
}

/**
 * Mantida apenas como alias de compatibilidade com possíveis usos legados
 * que ainda chamem `generateSchedule()`.
 */
export function generateSchedule(): Shift[] {
  return getSchedule();
}

// ============================================================================
// VALIDAÇÃO
// ============================================================================
// Como a escala é estática, a validação aqui é uma "conferência de integridade":
// confirma se os dados embarcados correspondem ao que foi acordado.
// ============================================================================

export interface ValidationResult {
  rule: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
  details: string[];
}

const dowNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function runValidation(shifts: Shift[]): ValidationResult[] {
  const results: ValidationResult[] = [];

  // 1) Período correto: 17/05/2026 a 31/12/2026
  try {
    const firstDate = shifts[0]?.date;
    const lastDate = shifts[shifts.length - 1]?.date;
    const expectedFirst = '2026-05-17';
    const expectedLast = '2026-12-29'; // último slot real (terça)
    const firstOk = firstDate && format(firstDate, 'yyyy-MM-dd') === expectedFirst;
    const lastOk = lastDate && format(lastDate, 'yyyy-MM-dd') === expectedLast;
    results.push({
      rule: 'Período da escala (17/05/2026 a 31/12/2026)',
      status: firstOk && lastOk ? 'pass' : 'fail',
      message: firstOk && lastOk ? 'Datas inicial e final corretas' : 'Período fora do esperado',
      details: firstOk && lastOk ? [] : [
        `Primeira: ${firstDate ? format(firstDate, 'dd/MM/yyyy') : '—'} (esperado 17/05/2026)`,
        `Última: ${lastDate ? format(lastDate, 'dd/MM/yyyy') : '—'}`,
      ],
    });
  } catch (err) {
    results.push({
      rule: 'Período da escala',
      status: 'fail',
      message: 'Erro ao verificar período',
      details: [String(err)],
    });
  }

  // 2) Só Terça, Sexta e Domingo (Manhã) — fora isso, só Santa Ceia
  const wrongDay: string[] = [];
  shifts.forEach(s => {
    const dow = getDay(s.date);
    if (s.type === 'SANTA_CEIA') return; // Santa Ceia é exceção válida
    if (dow === 2 && s.type === 'NOITE') return;       // Terça Noite OK
    if (dow === 5 && s.type === 'NOITE') return;       // Sexta Noite OK
    if (dow === 0 && s.type === 'MANHÃ') return;       // Domingo Manhã OK
    wrongDay.push(`${format(s.date, 'dd/MM')} (${dowNames[dow]}) ${s.type}`);
  });
  results.push({
    rule: 'Dias e turnos permitidos (Ter Noite, Sex Noite, Dom Manhã)',
    status: wrongDay.length === 0 ? 'pass' : 'fail',
    message: wrongDay.length === 0 ? 'Todos os turnos estão em dias válidos' : `${wrongDay.length} turno(s) com dia/tipo errado`,
    details: wrongDay,
  });

  // 3) Domingos alternados (a cada 14 dias a partir de 17/05/2026)
  const sundayShifts = shifts.filter(s => getDay(s.date) === 0 && s.type === 'MANHÃ');
  const sundayDates = sundayShifts.map(s => format(s.date, 'yyyy-MM-dd'));
  const expectedSundays: string[] = [];
  const cursor = new Date(2026, 4, 17);
  const limit = new Date(2026, 11, 31);
  while (cursor <= limit) {
    expectedSundays.push(format(cursor, 'yyyy-MM-dd'));
    cursor.setDate(cursor.getDate() + 14);
  }
  const missing = expectedSundays.filter(d => !sundayDates.includes(d));
  const extra = sundayDates.filter(d => !expectedSundays.includes(d));
  results.push({
    rule: 'Domingos alternados (a cada 14 dias)',
    status: missing.length === 0 && extra.length === 0 ? 'pass' : 'fail',
    message: missing.length === 0 && extra.length === 0
      ? `${sundayShifts.length} domingos manhã na escala`
      : 'Padrão de domingos quebrado',
    details: [
      ...missing.map(d => `Faltando: ${format(parseISO(d), 'dd/MM/yyyy')}`),
      ...extra.map(d => `Sobrando: ${format(parseISO(d), 'dd/MM/yyyy')}`),
    ],
  });

  // 4) Santa Ceia em 16/08/2026 (sem porteiros)
  const santaCeia = shifts.filter(s => s.type === 'SANTA_CEIA');
  const sc = santaCeia[0];
  const scOk = santaCeia.length === 1 && sc && format(sc.date, 'yyyy-MM-dd') === '2026-08-16' && sc.assignedBrothers.length === 0;
  results.push({
    rule: 'Santa Ceia em 16/08/2026 (sem porteiros)',
    status: scOk ? 'pass' : 'fail',
    message: scOk ? 'Santa Ceia marcada corretamente' : 'Santa Ceia incorreta ou faltando',
    details: scOk ? [] : santaCeia.map(s => `${format(s.date, 'dd/MM/yyyy')} - ${s.assignedBrothers.length} irmão(s)`),
  });

  // 5) Slots com 2 ou 3 irmãos (nunca 0, exceto Santa Ceia; nunca >3)
  const slotsWrong: string[] = [];
  let count3 = 0, count2 = 0;
  shifts.forEach(s => {
    if (s.type === 'SANTA_CEIA') return;
    const n = s.assignedBrothers.length;
    if (n === 3) count3++;
    else if (n === 2) count2++;
    else slotsWrong.push(`${format(s.date, 'dd/MM')} ${s.type} → ${n} irmãos`);
  });
  results.push({
    rule: 'Quantidade de irmãos por turno (2 ou 3)',
    status: slotsWrong.length === 0 ? 'pass' : 'fail',
    message: slotsWrong.length === 0
      ? `${count3} turnos com 3 irmãos · ${count2} turnos com 2 (Thiago removido)`
      : `${slotsWrong.length} turno(s) com quantidade inválida`,
    details: slotsWrong,
  });

  // 6) Thiago não pode aparecer em nenhum turno
  const thiagoSlots: string[] = [];
  shifts.forEach(s => {
    if (s.assignedBrothers.includes('thiago')) {
      thiagoSlots.push(`${format(s.date, 'dd/MM/yyyy')} ${s.type}`);
    }
  });
  results.push({
    rule: 'Thiago removido da lista',
    status: thiagoSlots.length === 0 ? 'pass' : 'fail',
    message: thiagoSlots.length === 0 ? 'Thiago não aparece em nenhum turno' : 'Thiago encontrado em turnos',
    details: thiagoSlots,
  });

  // 7) Sem repetição de irmão no mesmo dia
  const overlap: string[] = [];
  const byDay: Record<string, Set<string>> = {};
  shifts.forEach(s => {
    if (s.type === 'SANTA_CEIA') return;
    const key = format(s.date, 'yyyy-MM-dd');
    if (!byDay[key]) byDay[key] = new Set();
    s.assignedBrothers.forEach(id => {
      if (byDay[key].has(id)) {
        const name = BROTHERS.find(b => b.id === id)?.name || id;
        overlap.push(`${name} repetido em ${format(s.date, 'dd/MM/yyyy')}`);
      }
      byDay[key].add(id);
    });
  });
  results.push({
    rule: 'Sem repetição no mesmo dia',
    status: overlap.length === 0 ? 'pass' : 'fail',
    message: overlap.length === 0 ? 'Nenhum irmão repetido no mesmo dia' : 'Irmãos repetidos encontrados',
    details: overlap,
  });

  return results;
}
