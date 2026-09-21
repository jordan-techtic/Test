import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <EmptyState
        title="Page not found"
        description="That address is not part of this workspace. Return home to continue."
      />
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
}
