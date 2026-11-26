import type { Point } from '../../../../packages/planes/types.ts'
/** Body depth at station y for a slanted wing root given by two points on the left half. */
export function keelAt(root: [Point, Point], width: number, y: number): number
