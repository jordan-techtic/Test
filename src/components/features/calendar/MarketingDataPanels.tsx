import type { UseQueryResult } from '@tanstack/react-query'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type {
  ActivityOut,
  AuditLogEntry,
  HistoricalManagementData,
  KlaviyoNotification,
  KlaviyoPerformanceData,
  PaginatedListData,
  PerformanceDataList,
  PerformanceMetricsData,
} from '@/types/api'

interface MarketingDataPanelsProps {
  activitiesQuery: UseQueryResult<PaginatedListData<ActivityOut>>
  auditLogQuery: UseQueryResult<PaginatedListData<AuditLogEntry>>
  klaviyoPerformanceQuery: UseQueryResult<KlaviyoPerformanceData>
  klaviyoNotificationsQuery: UseQueryResult<{ items: KlaviyoNotification[] }>
  performanceMetricsQuery: UseQueryResult<PerformanceMetricsData>
  historicalManagementQuery: UseQueryResult<HistoricalManagementData>
  performanceDataQuery: UseQueryResult<PerformanceDataList>
}

function PanelSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

function EmptyRow({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>
  )
}

export function MarketingDataPanels({
  activitiesQuery,
  auditLogQuery,
  klaviyoPerformanceQuery,
  klaviyoNotificationsQuery,
  performanceMetricsQuery,
  historicalManagementQuery,
  performanceDataQuery,
}: MarketingDataPanelsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Activities</CardTitle>
          <CardDescription>Marketing activities for the selected year.</CardDescription>
        </CardHeader>
        <CardContent>
          {activitiesQuery.isLoading ? (
            <PanelSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activitiesQuery.data?.items.length ? (
                  activitiesQuery.data.items.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.title}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyRow colSpan={3} message="No activities returned." />
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>Recent changes to calendar activities.</CardDescription>
        </CardHeader>
        <CardContent>
          {auditLogQuery.isLoading ? (
            <PanelSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Performed By</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogQuery.data?.items.length ? (
                  auditLogQuery.data.items.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.action}</TableCell>
                      <TableCell>{entry.performed_by}</TableCell>
                      <TableCell>{entry.performed_at}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyRow colSpan={3} message="No audit log entries returned." />
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Klaviyo Performance</CardTitle>
          <CardDescription>Campaign performance from Klaviyo.</CardDescription>
        </CardHeader>
        <CardContent>
          {klaviyoPerformanceQuery.isLoading ? (
            <PanelSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Open Rate</TableHead>
                  <TableHead>Click Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {klaviyoPerformanceQuery.data?.items.length ? (
                  klaviyoPerformanceQuery.data.items.map((item) => (
                    <TableRow key={item.campaign_code}>
                      <TableCell>{item.campaign_code}</TableCell>
                      <TableCell>{item.open_rate ?? '—'}</TableCell>
                      <TableCell>{item.click_rate ?? '—'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyRow colSpan={3} message="No Klaviyo performance data returned." />
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Klaviyo Notifications</CardTitle>
          <CardDescription>Performance alerts and notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          {klaviyoNotificationsQuery.isLoading ? (
            <PanelSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Read</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {klaviyoNotificationsQuery.data?.items.length ? (
                  klaviyoNotificationsQuery.data.items.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>{notification.message}</TableCell>
                      <TableCell>{notification.created_at}</TableCell>
                      <TableCell>{notification.read ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyRow colSpan={3} message="No notifications returned." />
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Aggregated campaign metrics.</CardDescription>
        </CardHeader>
        <CardContent>
          {performanceMetricsQuery.isLoading ? (
            <PanelSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceMetricsQuery.data?.metrics.length ? (
                  performanceMetricsQuery.data.metrics.map((metric, index) => (
                    <TableRow key={`${metric.campaign_code}-${metric.metric_type}-${index}`}>
                      <TableCell>{metric.campaign_code}</TableCell>
                      <TableCell>{metric.metric_type}</TableCell>
                      <TableCell>{metric.value ?? '—'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyRow colSpan={3} message="No performance metrics returned." />
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Management</CardTitle>
          <CardDescription>Year-over-year calendar comparison.</CardDescription>
        </CardHeader>
        <CardContent>
          {historicalManagementQuery.isLoading ? (
            <PanelSkeleton />
          ) : historicalManagementQuery.data ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Activities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{historicalManagementQuery.data.current_year}</TableCell>
                  <TableCell>
                    {historicalManagementQuery.data.current_calendar.activities.length}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{historicalManagementQuery.data.previous_year}</TableCell>
                  <TableCell>
                    {historicalManagementQuery.data.previous_calendar.activities.length}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No historical data returned.</p>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Performance Data</CardTitle>
          <CardDescription>Content calendar performance data.</CardDescription>
        </CardHeader>
        <CardContent>
          {performanceDataQuery.isLoading ? (
            <PanelSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceDataQuery.data?.items.length ? (
                  performanceDataQuery.data.items.map((item) => (
                    <TableRow key={`${item.campaign_code}-${item.activity_date}`}>
                      <TableCell>{item.campaign_code}</TableCell>
                      <TableCell>{item.activity_title}</TableCell>
                      <TableCell>{item.activity_date}</TableCell>
                      <TableCell>{item.metric_value ?? '—'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyRow colSpan={4} message="No performance data returned." />
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
