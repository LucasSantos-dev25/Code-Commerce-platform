import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { REDIS_CLIENT } from './redis.constants'

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const url = configService.getOrThrow<string>('REDIS_URL')

        const client = new Redis(url, {
          retryStrategy: (times: number) => {
            if (times > 3) return null
            return Math.min(times * 200, 1000)
          },
          lazyConnect: false,
        })

        client.on('connect', () => {
          console.log('✅ Redis conectado')
        })

        client.on('error', (err: Error) => {
          console.error('❌ Redis erro:', err.message)
        })

        client.on('reconnecting', () => {
          console.warn('⚠️  Redis reconectando...')
        })

        return client
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}