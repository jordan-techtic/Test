import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function ServerError() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">500 Server Error</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Something went wrong on our side. Please try again later.
      </p>
      <Button asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  )
}
