import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
      <h1 className="text-[28px] font-semibold leading-9">404 Not Found</h1>
      <p className="text-sm text-muted-foreground">This page does not exist.</p>
      <Button asChild>
        <Link to="/">Back to sign in</Link>
      </Button>
    </main>
  );
}
