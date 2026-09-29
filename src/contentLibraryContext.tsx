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

const CONTENT_LIBRARY_MOCK: ContentLibraryItem[] = [
  {
    id: '1',
    title: '[City Name win], hallelujah | Justin Bieber Trend',
    description: 'Instagram Reel trend template',
    category: 'Instagram Reel',
    tags: ['reel', 'trend', 'music'],
  },
  {
    id: '2',
    title: 'Hates to see me coming',
    description: 'Stories and feed variants',
    category: 'Social Media',
    tags: ['stories', 'feed'],
  },
  {
    id: '3',
    title: 'Things I consider perfect | [City Name] edition',
    description: 'Instagram Feed carousel',
    category: 'Social Media',
    tags: ['feed', 'local'],
  },
  {
    id: '4',
    title: 'Market update — Austin Q2',
    description: 'Professional market snapshot',
    category: 'Social Media',
    tags: ['market', 'update'],
  },
  {
    id: '5',
    title: 'Neighborhood spotlight template',
    description: 'Highlight local areas',
    category: 'Instagram Reel',
    tags: ['neighborhood', 'reel'],
  },
  {
    id: '6',
    title: 'Open house promo reel',
    description: 'Drive attendance with short video',
    category: 'Instagram Reel',
    tags: ['open house', 'reel'],
  },
];

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

export function ContentLibraryProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredItems = useMemo(
    () => CONTENT_LIBRARY_MOCK.filter((item) => matchesQuery(item, searchQuery)),
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
      visibleCount: Math.min(visibleCount, filteredItems.length),
      loadMore,
      hasMore: visibleCount < filteredItems.length,
      isEmpty: filteredItems.length === 0,
    }),
    [searchQuery, filteredItems, visibleCount, loadMore],
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

export function cardMatchesLibraryFilter(
  cardTitle: string,
  cardCategory: string,
  ctx: ContentLibraryContextValue,
  cardIndex: number,
): boolean {
  if (ctx.isEmpty) {
    return false;
  }
  const q = ctx.searchQuery.trim().toLowerCase();
  if (q) {
    const haystack = `${cardTitle} ${cardCategory}`.toLowerCase();
    if (!haystack.includes(q)) {
      return false;
    }
  }
  return cardIndex < ctx.visibleCount;
}
