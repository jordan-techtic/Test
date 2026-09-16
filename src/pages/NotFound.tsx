import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background p-6 text-center">
      <h1 className="text-[28px] font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground">The page you requested does not exist.</p>
      <Button asChild>
        <Link to="/calendar">Go to calendar</Link>
      </Button>
    </div>
  );
}
