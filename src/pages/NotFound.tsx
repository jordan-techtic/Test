import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">404 Not Found</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        The page you requested does not exist.
      </p>
      <Button asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  )
}
