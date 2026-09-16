import { describe, expect, it } from 'vitest'

import { toast, Toaster } from '@/components/ui/sonner'

describe('sonner primitive', () => {
  it('exports Toaster and toast API', () => {
    expect(Toaster).toBeTypeOf('function')
    expect(toast).toBeTypeOf('function')
    expect(typeof toast.success).toBe('function')
    expect(typeof toast.error).toBe('function')
    expect(typeof toast.dismiss).toBe('function')
  })
})
