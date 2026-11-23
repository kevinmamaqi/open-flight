import type { PlanePlan } from '../../../../packages/planes/types.ts'
import type { jsPDF } from 'jspdf'
export function planePdfBytes(
  plan: PlanePlan,
  jsPdfClass: typeof jsPDF,
  fontBase64: string,
  fontNotice: string,
): Uint8Array
