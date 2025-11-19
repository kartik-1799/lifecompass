import { redisCache } from './redis.cache';
import { memoryCache } from './memory.cache';

export type CacheType = 'redis' | 'memory';

export class CacheFactory {
  static getCache(type: CacheType = 'memory') {
    return type === 'redis' ? redisCache : memoryCache;
  }
}
