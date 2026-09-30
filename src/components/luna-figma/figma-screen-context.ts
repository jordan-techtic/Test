import { createContext } from 'react';

export type DashboardAnnouncementRow = {
  title: string;
  dateLabel: string;
};

export type FigmaScreenDataContextValue = {
  bound: string;
  values: Record<string, string>;
  displayName: string;
  loading: boolean;
  statusMessage: string;
  submit: () => Promise<void>;
  greetingText?: string;
  creditUsageText?: string;
  creditProgressPx?: number;
  downloadsText?: string;
  contentGeneratedText?: string;
  announcements?: DashboardAnnouncementRow[];
  suggestionTexts?: string[];
};

export const FigmaScreenDataContext = createContext<FigmaScreenDataContextValue | null>(null);
