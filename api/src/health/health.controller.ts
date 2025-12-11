
import { Controller, Get } from '@nestjs/common'
import { ConfigService } from "@nestjs/config"
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator, DiskHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private configService: ConfigService,
  ) {
    this.webAppUrl = this.configService.get<string>('WEB_APP_URL') || ''
    this.s3Url = this.configService.get<string>('AWS_S3_URL') || ''
  }

  private webAppUrl: string
  private s3Url: string


  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('web-app', this.webAppUrl),
      () => this.http.responseCheck('s3', this.s3Url, (res) => res.status === 403),
      () => this.db.pingCheck('database'),
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.7 }),
      () => this.memory.checkHeap('memory_heap', 256 * 1024 * 1024)
    ])
  }
}
