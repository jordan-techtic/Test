import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from '@/components/ui/spinner'

describe('Spinner', () => {
  it('renders with accessible status role', () => {
    render(<Spinner label="Loading calendar" />)
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Loading calendar',
    )
  })
})
