import { Injectable, Inject } from '@nestjs/common'
import Redis from 'ioredis'
import { REDIS_CLIENT } from './redis.constants'

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value)
    if (ttlSeconds) {
      await this.redis.set(key, serialized, 'EX', ttlSeconds)
    } else {
      await this.redis.set(key, serialized)
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key)
    if (!data) return null
    return JSON.parse(data) as T
  }

  async del(...keys: string[]): Promise<void> {
    await this.redis.del(...keys)
  }


  async delByPattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern)
    if (keys.length > 0) {
      await this.redis.del(...keys)
    }
  }

  async ttl(key: string): Promise<number> {
    return this.redis.ttl(key)
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key)
    return result === 1
  }
}