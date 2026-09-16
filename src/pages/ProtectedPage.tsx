import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ProtectedPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Protected Area</CardTitle>
          <CardDescription>
            This route is wrapped with ProtectedRoute and requires an access token
            in localStorage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Set a token with{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              localStorage.setItem(&apos;access_token&apos;, &apos;demo&apos;)
            </code>{' '}
            in the browser console to access this page without being redirected.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
