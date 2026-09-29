import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface ContentLibraryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export interface ContentLibraryCardSlot {
  title: string;
  category: string;
}

/** One entry per compiled card in FigmaSection_n_3047_21253 (grid order). */
export const CONTENT_LIBRARY_CARD_SLOTS: ContentLibraryCardSlot[] = [
  {
    title: '[City Name win], hallelujah | Justin Bieber Trend',
    category: 'Instagram Reel',
  },
  {
    title: '[City Name win], hallelujah | Justin Bieber Trend',
    category: 'Instagram Reel',
  },
  { title: 'Hates to see me coming', category: 'Instagram Stories' },
  {
    title: 'Things I consider perfect | [City Name] edition',
    category: 'Instagram Feed',
  },
  { title: 'Hates to see me coming', category: 'Instagram Feed' },
  { title: 'Hates to see me coming', category: 'Instagram Feed' },
  {
    title: '[City Name win], hallelujah | Justin Bieber Trend',
    category: 'Instagram Reel',
  },
  { title: 'Hates to see me coming', category: 'Instagram Stories' },
  { title: 'Hates to see me coming', category: 'Instagram Feed' },
  { title: 'Hates to see me coming', category: 'Instagram Stories' },
  {
    title: '[City Name win], hallelujah | Justin Bieber Trend',
    category: 'Instagram Reel',
  },
  { title: 'Hates to see me coming', category: 'Instagram Stories' },
  { title: 'Hates to see me coming', category: 'Instagram Feed' },
  { title: 'Hates to see me coming', category: 'Instagram Stories' },
  {
    title: '[City Name win], hallelujah | Justin Bieber Trend',
    category: 'Instagram Reel',
  },
  { title: 'Hates to see me coming', category: 'Instagram Stories' },
  { title: 'Hates to see me coming', category: 'Instagram Feed' },
  { title: 'Hates to see me coming', category: 'Instagram Feed' },
  {
    title: '[City Name win], hallelujah | Justin Bieber Trend',
    category: 'Instagram Reel',
  },
  { title: 'Hates to see me coming', category: 'Instagram Stories' },
];

function slotToItem(slot: ContentLibraryCardSlot, index: number): ContentLibraryItem {
  return {
    id: String(index + 1),
    title: slot.title,
    description: slot.title,
    category: slot.category,
    tags: [slot.category.toLowerCase()],
  };
}

const CONTENT_LIBRARY_MOCK: ContentLibraryItem[] =
  CONTENT_LIBRARY_CARD_SLOTS.map(slotToItem);

const PAGE_SIZE = 6;

interface ContentLibraryContextValue {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filteredItems: ContentLibraryItem[];
  visibleCount: number;
  loadMore: () => void;
  hasMore: boolean;
  isEmpty: boolean;
}

const ContentLibraryContext = createContext<ContentLibraryContextValue | null>(
  null,
);

function matchesQuery(item: ContentLibraryItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) {
    return true;
  }
  const haystack = [
    item.title,
    item.description,
    item.category,
    ...item.tags,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

function matchingCardIndices(searchQuery: string): number[] {
  return CONTENT_LIBRARY_CARD_SLOTS.map((slot, index) =>
    matchesQuery(slotToItem(slot, index), searchQuery) ? index : -1,
  ).filter((index) => index >= 0);
}

export function cardMatchesLibraryFilter(
  cardTitle: string,
  cardCategory: string,
  ctx: ContentLibraryContextValue,
  cardIndex: number,
): boolean {
  const slot = CONTENT_LIBRARY_CARD_SLOTS[cardIndex];
  const title = slot?.title ?? cardTitle;
  const category = slot?.category ?? cardCategory;
  const item = slot
    ? slotToItem(slot, cardIndex)
    : {
        id: String(cardIndex),
        title,
        description: title,
        category,
        tags: [category.toLowerCase()],
      };

  if (!matchesQuery(item, ctx.searchQuery)) {
    return false;
  }

  const matching = matchingCardIndices(ctx.searchQuery);
  if (matching.length === 0) {
    return false;
  }

  const visible = matching.slice(0, ctx.visibleCount);
  return visible.includes(cardIndex);
}

export function ContentLibraryProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredItems = useMemo(
    () => CONTENT_LIBRARY_MOCK.filter((item) => matchesQuery(item, searchQuery)),
    [searchQuery],
  );

  const matchingCount = useMemo(
    () => matchingCardIndices(searchQuery).length,
    [searchQuery],
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery]);

  const loadMore = useCallback(() => {
    setVisibleCount((count) => count + PAGE_SIZE);
  }, []);

  const value = useMemo(
    (): ContentLibraryContextValue => ({
      searchQuery,
      setSearchQuery,
      filteredItems,
      visibleCount,
      loadMore,
      hasMore: visibleCount < matchingCount,
      isEmpty: matchingCount === 0,
    }),
    [searchQuery, filteredItems, visibleCount, loadMore, matchingCount],
  );

  return (
    <ContentLibraryContext.Provider value={value}>
      {children}
    </ContentLibraryContext.Provider>
  );
}

export function useContentLibrary(): ContentLibraryContextValue {
  const ctx = useContext(ContentLibraryContext);
  if (!ctx) {
    throw new Error('useContentLibrary must be used within ContentLibraryProvider');
  }
  return ctx;
}
