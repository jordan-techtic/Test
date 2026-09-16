import { isValid, parse } from 'date-fns'

export function parseLocalDateString(value: string): Date | undefined {
  const parsed = parse(value, 'yyyy-MM-dd', new Date())
  return isValid(parsed) ? parsed : undefined
}

export function getTodayLocalDateString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getTodayLocalDate(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}
