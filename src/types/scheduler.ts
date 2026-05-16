/**
 * Tipos e dados base da Escala de Porteiros — JD. São Luiz 2026 (provisória)
 *
 * Versão "Mai-Dez 2026": a escala é estática (pré-computada), seguindo a
 * mesma sequência de irmãos do site original (escala-irmaos-2026-mar) a
 * partir de 03/05/2026 Noite, transplantada para a nova malha de datas
 * (Terças e Sextas à Noite + Domingos Manhã alternados).
 *
 * Diferenças em relação à versão original:
 *  - Thiago foi removido da lista; onde ele apareceria na sequência, o
 *    slot fica com 2 irmãos (em vez de 3).
 *  - Demais irmãos estão SEM restrições nesta fase provisória.
 *  - Santa Ceia: apenas 16/08/2026 (sem porteiros escalados).
 */

export type ShiftType = 'MANHÃ' | 'TARDE' | 'NOITE' | 'SANTA_CEIA';

export interface Brother {
  id: string;
  name: string;
  /**
   * Restrições preservadas no tipo para compatibilidade com a UI original.
   * Nesta versão provisória, NENHUM irmão possui restrições.
   */
  constraints: {
    fixedPerMonth?: number;
    daysAllowed?: number[]; // 0=Dom, 1=Seg, ..., 6=Sáb
    shiftsAllowed?: ShiftType[];
    forbiddenDays?: number[];
  };
}

export interface Shift {
  id: string;
  date: Date;
  type: ShiftType;
  assignedBrothers: string[]; // IDs dos irmãos
}

/**
 * Lista de irmãos ativos na escala provisória.
 * Thiago foi removido conforme decisão (slot vazio onde ele apareceria
 * na sequência original gera turno com 2 irmãos).
 */
export const BROTHERS: Brother[] = [
  { id: 'adilson',         name: 'Adilson',         constraints: {} },
  { id: 'carlos_henrique', name: 'Carlos Henrique', constraints: {} },
  { id: 'donizete',        name: 'Donizete',        constraints: {} },
  { id: 'eduardo',         name: 'Eduardo',         constraints: {} },
  { id: 'elson',           name: 'Elson',           constraints: {} },
  { id: 'flavio',          name: 'Flavio',          constraints: {} },
  { id: 'isac',            name: 'Isac',            constraints: {} },
  { id: 'leandro',         name: 'Leandro',         constraints: {} },
  { id: 'lucas',           name: 'Lucas',           constraints: {} },
  { id: 'luis_henrique',   name: 'Luis Henrique',   constraints: {} },
  { id: 'luiz_felipe',     name: 'Luiz Felipe',     constraints: {} },
  { id: 'luiz_cezar',      name: 'Luíz Cezar',      constraints: {} },
  { id: 'marcos',          name: 'Marcos',          constraints: {} },
  { id: 'vicente',         name: 'Vicente',         constraints: {} },
  { id: 'williams',        name: 'Williams',        constraints: {} },
];
