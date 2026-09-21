import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '@/components/features/Home';
import { colors } from '@/theme/tokens';

describe('design tokens', () => {
  it('maps Sofia accent exactly', () => {
    expect(colors.accent).toBe('#c8a47e');
    expect(colors.primary).toBe('#00000000');
    expect(colors['color-99']).toBe('#272727');
  });
});

describe('Home', () => {
  it('renders the Home heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
  });
});
