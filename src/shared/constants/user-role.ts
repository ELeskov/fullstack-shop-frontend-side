export const USER_ROLE = {
  REGULAR: 'REGULAR',
  ADMIN: 'ADMIN',
} as const

export type EnumUserRole = keyof typeof USER_ROLE
