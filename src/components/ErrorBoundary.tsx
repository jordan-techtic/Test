import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-4 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Something went wrong
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            An unexpected error occurred while rendering this page.
          </p>
          <div className="flex gap-2">
            <Button type="button" onClick={() => window.location.reload()}>
              Reload
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link to="/500">View error page</Link>
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
