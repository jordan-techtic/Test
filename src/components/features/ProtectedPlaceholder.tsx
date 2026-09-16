import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { useMarketingWorkspace } from "@/hooks/useMarketingWorkspace";
import type { ActivityOut, CampaignCodeData } from "@/types/api";

function campaignCodeSummary(campaignCode: CampaignCodeData | null): string {
  if (!campaignCode) {
    return "No campaign code returned for this activity.";
  }
  const extra = campaignCode.extra ?? {};
  const keys = Object.keys(extra);
  if (keys.length === 0) {
    return "No campaign code fields were returned.";
  }
  return keys.map((key) => `${key}: ${String(extra[key])}`).join(" · ");
}

function ActivityDetail({
  activity,
  campaignCode,
}: {
  activity: ActivityOut | null;
  campaignCode: CampaignCodeData | null;
}) {
  if (!activity) {
    return (
      <EmptyState
        title="No activity selected"
        description="Select an activity to load its details and campaign code."
      />
    );
  }

  return (
    <section aria-labelledby="activity-detail-heading" className="rounded-md border border-border bg-card p-4">
      <h2 id="activity-detail-heading" className="text-lg font-semibold text-foreground">
        Activity detail
      </h2>
      <dl className="mt-3 grid gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Type</dt>
          <dd className="text-foreground">{activity.activity_type_name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Scheduled</dt>
          <dd className="text-foreground">{activity.scheduled_date}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Status</dt>
          <dd className="text-foreground">{activity.status}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Campaign code</dt>
          <dd className="text-right text-foreground">{campaignCodeSummary(campaignCode)}</dd>
        </div>
      </dl>
    </section>
  );
}

export function ProtectedPlaceholder() {
  const { user } = useAuth();
  const { status, errorMessage, activities, selectedActivity, campaignCode, reload, selectActivity } =
    useMarketingWorkspace();

  if (status === "loading") {
    return (
      <div className="space-y-4">
        <Spinner label="Loading workspace" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <PageHeader title="Home" description="Calendar activities could not be loaded." />
        <ErrorMessage message={errorMessage ?? "Unable to load calendar activities."} />
        <Button type="button" onClick={() => void reload()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Home"
        description={`Signed in as ${user?.email ?? user?.username ?? "marketing team member"}.`}
      />
      {status === "empty" ? (
        <EmptyState
          title="No calendar activities to show"
          description="You are signed in. Calendar activities will appear here when they are available."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.activity_type_name}</TableCell>
                  <TableCell>{activity.scheduled_date}</TableCell>
                  <TableCell>{activity.status}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => void selectActivity(activity.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ActivityDetail activity={selectedActivity} campaignCode={campaignCode} />
        </div>
      )}
    </div>
  );
}
