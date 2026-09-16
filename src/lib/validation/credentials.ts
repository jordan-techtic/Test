export function getValidationCredentials(): {
  email: string
  password: string
} | null {
  const email =
    import.meta.env.VITE_LUNA_VALIDATION_EMAIL || __LUNA_VALIDATION_EMAIL__ || ''
  const password =
    import.meta.env.VITE_LUNA_VALIDATION_PASSWORD ||
    __LUNA_VALIDATION_PASSWORD__ ||
    ''

  if (!email || !password) {
    return null
  }

  return { email, password }
}

export function hasValidationCredentials(): boolean {
  return getValidationCredentials() !== null
}
