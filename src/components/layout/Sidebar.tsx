import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

const navItems = [{ to: '/', label: 'Calendar', end: true }]

export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex h-14 items-center border-b border-border px-4">
        <img
          src="/brand-logo.svg"
          alt="Marketing Content Calendar"
          className="h-8 w-auto"
        />
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
