export type ClassValue = false | null | undefined | string;

export function cx(...values: ClassValue[]) {
  return values.filter(Boolean).join(' ');
}
