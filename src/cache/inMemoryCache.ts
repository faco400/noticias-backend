type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class InMemoryCache {
  private cache = new Map<string, CacheEntry<any>>();
  private TTL = 60 * 1000; // 1 minuto

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this.TTL;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear() {
    this.cache.clear();
  }
}

export const inMemoryCache = new InMemoryCache();
