import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function ServerError() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
      <h1 className="text-[28px] font-semibold leading-9">500 Server Error</h1>
      <p className="text-sm text-muted-foreground">Something went wrong. Please try again.</p>
      <Button asChild>
        <Link to="/">Back to sign in</Link>
      </Button>
    </main>
  );
}
