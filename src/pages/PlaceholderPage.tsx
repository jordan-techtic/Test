import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/Spinner';

export function PlaceholderPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner label="Loading placeholder content" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Placeholder</h2>
      <p className="text-muted-foreground">Content loaded successfully.</p>
    </div>
  );
}
