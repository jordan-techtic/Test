import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function ServerError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
      <h1 className="text-[28px] font-semibold leading-9">Server error</h1>
      <p className="text-sm text-muted-foreground">Something went wrong. Please try again.</p>
      <Button asChild>
        <Link to="/">Go to sign in</Link>
      </Button>
    </div>
  );
}
