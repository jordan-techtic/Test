import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ActivityTypeOption } from "@/types/api";

interface ActivityFiltersProps {
  types: ActivityTypeOption[];
  categories: string[];
  activityTypes: string[];
  onCategoriesChange: (values: string[]) => void;
  onTypesChange: (values: string[]) => void;
  onClear: () => void;
  isLoading?: boolean;
}

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

const CATEGORY_OPTIONS = [
  { value: "promotions", label: "Promotions" },
  { value: "content", label: "Content" },
  { value: "focuses", label: "Focuses" },
];

const TYPE_FALLBACK: ActivityTypeOption[] = [
  {
    value: "email_send",
    label: "Email Send",
    category: "promotions",
    color: "#E85D04",
    fields: [],
  },
  {
    value: "sms_send",
    label: "SMS Send",
    category: "promotions",
    color: "#E85D04",
    fields: [],
  },
  {
    value: "blog_post",
    label: "Blog Post",
    category: "content",
    color: "#E85D04",
    fields: [],
  },
  {
    value: "social_post",
    label: "Social Post",
    category: "content",
    color: "#E85D04",
    fields: [],
  },
  {
    value: "product_focus",
    label: "Product Focus",
    category: "focuses",
    color: "#E85D04",
    fields: [],
  },
  {
    value: "seasonal_focus",
    label: "Seasonal Focus",
    category: "focuses",
    color: "#E85D04",
    fields: [],
  },
];

export function ActivityFilters({
  types,
  categories,
  activityTypes,
  onCategoriesChange,
  onTypesChange,
  onClear,
  isLoading,
}: ActivityFiltersProps) {
  if (isLoading) {
    return (
      <div className="flex gap-2">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
    );
  }

  const hasFilters = categories.length > 0 || activityTypes.length > 0;
  const typeOptions = types.length > 0 ? types : TYPE_FALLBACK;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <fieldset className="min-w-0 space-y-1 border-0 p-0">
        <legend className="text-xs font-medium text-muted-foreground">Category</legend>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" size="sm" aria-label="Category">
              Category{categories.length ? ` (${categories.length})` : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            {CATEGORY_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={categories.includes(option.value)}
                onSelect={(event) => event.preventDefault()}
                onCheckedChange={() => onCategoriesChange(toggleValue(categories, option.value))}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </fieldset>
      <fieldset className="min-w-0 space-y-1 border-0 p-0">
        <legend className="text-xs font-medium text-muted-foreground">Activity type</legend>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" size="sm" aria-label="Activity type">
              Activity type{activityTypes.length ? ` (${activityTypes.length})` : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
            <DropdownMenuLabel>Activity type</DropdownMenuLabel>
            {typeOptions.map((type) => (
              <DropdownMenuCheckboxItem
                key={type.value}
                checked={activityTypes.includes(type.value)}
                onSelect={(event) => event.preventDefault()}
                onCheckedChange={() => onTypesChange(toggleValue(activityTypes, type.value))}
              >
                {type.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </fieldset>
      {hasFilters ? (
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          Clear filters
        </Button>
      ) : null}
    </div>
  );
}
