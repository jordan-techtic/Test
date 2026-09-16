import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function PublicPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Public landing page for the Marketing Content Calendar application.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/protected">Go to Protected Area</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/placeholder">View Loading Demo</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
