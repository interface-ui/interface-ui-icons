export const ICON_TYPES = [
  'filled',
  'outlined',
  'round',
  'sharp',
  'two-tone',
] as const
export type IconType = (typeof ICON_TYPES)[number]
