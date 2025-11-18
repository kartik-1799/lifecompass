const cache = new Map<string, any>();

export const setCache = (key: string, value: any, ttl: number = 3600): void => {
  cache.set(key, { value, expiry: Date.now() + ttl * 1000 });
};

export const getCache = (key: string): any => {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.value;
};

export const clearCache = (): void => {
  cache.clear();
};
