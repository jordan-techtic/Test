import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from '@/components/ui/Spinner';

describe('Spinner', () => {
  it('renders with accessible loading label', () => {
    render(<Spinner label="Loading calendar" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading calendar')).toBeInTheDocument();
  });
});
