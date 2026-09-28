import { createElement } from 'react';
import { FigmaAboutUsScreenPage } from '../components/luna-figma/FigmaAboutUsScreenPage';
import { apiRequest } from '../lib/api-client';
import { unwrapResponse } from '../lib/unwrap-response';
import type { AboutUsContent } from '../types/api';

export const ABOUT_US_PATH = '/api/about-us';
export const ABOUT_US_LIST_UNWRAP_KEY = null;

function isAboutUsContent(value: unknown): value is AboutUsContent {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    'mission_statement' in record ||
    'team_intro' in record ||
    'story' in record ||
    'problem_statement' in record ||
    'contact_email' in record
  );
}

function parseAboutUsResponse(body: unknown): AboutUsContent {
  if (body && typeof body === 'object' && !Array.isArray(body) && 'data' in body) {
    const envelope = body as Record<string, unknown>;
    const inner = envelope.data;
    if (isAboutUsContent(inner)) {
      return inner;
    }
  }

  const unwrapped = unwrapResponse<unknown>(body, ABOUT_US_LIST_UNWRAP_KEY);
  if (isAboutUsContent(unwrapped)) {
    return unwrapped;
  }

  return unwrapped as AboutUsContent;
}

let aboutUsInflight: Promise<AboutUsContent> | null = null;
let aboutUsCache: AboutUsContent | null = null;

export function resetAboutUsCache(): void {
  aboutUsCache = null;
}

export async function getAboutUs(): Promise<AboutUsContent> {
  if (aboutUsCache) {
    return aboutUsCache;
  }

  if (aboutUsInflight) {
    return aboutUsInflight;
  }

  aboutUsInflight = (async () => {
    try {
      const response = await apiRequest<unknown>('GET', ABOUT_US_PATH);
      const parsed = parseAboutUsResponse(response);
      aboutUsCache = parsed;
      return parsed;
    } finally {
      aboutUsInflight = null;
    }
  })();

  return aboutUsInflight;
}

export function AboutUsPage() {
  return createElement('div', { className: 'w-full flex flex-col' }, createElement(FigmaAboutUsScreenPage));
}
