import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/Spinner';
import { useActivityQuery } from '@/hooks/useActivityQuery';
import { getApiErrorMessage } from '@/lib/api/errors';

interface ViewActivityDialogProps {
  activityId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatField(value: string | null | undefined): string {
  if (!value?.trim()) {
    return '—';
  }
  return value;
}

export function ViewActivityDialog({
  activityId,
  open,
  onOpenChange,
}: ViewActivityDialogProps) {
  const activityQuery = useActivityQuery(activityId, open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Activity details</DialogTitle>
          <DialogDescription>View marketing activity information.</DialogDescription>
        </DialogHeader>

        {activityQuery.isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner label="Loading activity" />
          </div>
        ) : activityQuery.isError ? (
          <p className="text-sm text-destructive" role="alert">
            {getApiErrorMessage(activityQuery.error)}
          </p>
        ) : activityQuery.data ? (
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">Title</dt>
              <dd>{activityQuery.data.title}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Date</dt>
              <dd>{activityQuery.data.date}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Activity type</dt>
              <dd>{activityQuery.data.activity_type}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Status</dt>
              <dd className="capitalize">{activityQuery.data.status}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Category</dt>
              <dd>{activityQuery.data.category}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Details</dt>
              <dd>{formatField(activityQuery.data.details ?? activityQuery.data.description)}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Additional info</dt>
              <dd>{formatField(activityQuery.data.additional_info)}</dd>
            </div>
          </dl>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
