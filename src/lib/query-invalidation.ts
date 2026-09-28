import { resetAboutUsCache } from '../api/about-us';
import { resetVisitorHomeCache } from '../api/visitor-home';

type InvalidationListener = () => void;

const visitorHomeListeners = new Set<InvalidationListener>();
const aboutUsListeners = new Set<InvalidationListener>();

export function subscribeVisitorHome(listener: InvalidationListener): () => void {
  visitorHomeListeners.add(listener);
  return () => visitorHomeListeners.delete(listener);
}

export function subscribeAboutUs(listener: InvalidationListener): () => void {
  aboutUsListeners.add(listener);
  return () => aboutUsListeners.delete(listener);
}

export function invalidateVisitorHome(): void {
  resetVisitorHomeCache();
  visitorHomeListeners.forEach((listener) => listener());
}

export function invalidateAboutUs(): void {
  resetAboutUsCache();
  aboutUsListeners.forEach((listener) => listener());
}
