import { useEffect, useState } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedPlaceholder() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 400);
    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Spinner label="Loading workspace" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Home"
        description={`Signed in as ${user?.email ?? user?.username ?? "marketing team member"}.`}
      />
      <EmptyState
        title="No calendar activities to show"
        description="You are signed in. Calendar activities will appear here when they are available."
      />
    </div>
  );
}
