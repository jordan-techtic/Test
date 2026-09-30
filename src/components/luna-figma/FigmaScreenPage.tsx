/** luna-spec-codegen: owned-layout */
import { useEffect, useState, type JSX } from 'react';
import { FigmaScreen_n_4543_3496 } from './FigmaScreen_n_4543_3496';
import { FigmaScreen_n_1006_1333 } from './FigmaScreen_n_1006_1333';
import { FigmaScreen_n_998_1024 } from './FigmaScreen_n_998_1024';
import { FigmaScreen_n_3158_22053 } from './FigmaScreen_n_3158_22053';
import {
  FigmaScreenDataProvider,
  FigmaScreenStatusAnnouncer,
} from './useFigmaScreenData';

const routes: Record<string, () => JSX.Element> = {
  '': FigmaScreen_n_4543_3496,
  dashboard: FigmaScreen_n_4543_3496,
  'updated-dashboard': FigmaScreen_n_4543_3496,
  'sign-up': FigmaScreen_n_1006_1333,
  signup: FigmaScreen_n_1006_1333,
  'sign-in': FigmaScreen_n_998_1024,
  profile: FigmaScreen_n_3158_22053,
};

function readPathname(): string {
  return window.location.pathname.replace(/^\/+|\/+$/g, '');
}

export function FigmaScreenPage() {
  const [path, setPath] = useState(readPathname);

  useEffect(() => {
    const onPopState = () => setPath(readPathname());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const Screen = routes[path] ?? FigmaScreen_n_4543_3496;

  return (
    <FigmaScreenDataProvider routePath={path}>
      <FigmaScreenStatusAnnouncer />
      <Screen />
    </FigmaScreenDataProvider>
  );
}
