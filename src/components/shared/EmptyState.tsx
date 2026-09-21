import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  headingLevel?: 1 | 2;
};

export function EmptyState({ title, description, icon, headingLevel = 2 }: EmptyStateProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-16)] bg-[color:var(--color-background)] px-4 py-12 text-center">
      {icon}
      <Heading className="m-0 font-eb-garamond text-[22px] font-semibold text-[color:var(--color-text-primary)]">
        {title}
      </Heading>
      <p className="m-0 max-w-md text-sm text-[color:var(--color-text-primary)]">{description}</p>
    </div>
  );
}
