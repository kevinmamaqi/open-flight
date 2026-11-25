import type { PlanePlan } from '../../../../packages/planes/types.ts'
import type { jsPDF } from 'jspdf'
export function planePdfBytes(
  plan: PlanePlan,
  jsPdfClass: typeof jsPDF,
  fonts: { text: string; bold: string; display: string },
): Uint8Array
