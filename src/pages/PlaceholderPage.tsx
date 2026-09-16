import { useEffect, useState } from 'react'

import { Spinner } from '@/components/ui/spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function PlaceholderPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <Spinner label="Loading placeholder content" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Placeholder Content</CardTitle>
          <CardDescription>
            Demonstrates the shared Spinner loading state from CMC-9.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Content loaded successfully after the simulated request completed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
