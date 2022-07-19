import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
    SequelizeHealthIndicator
} from '@nestjs/terminus';
import { UsersHealthIndicator } from 'src/users/users.health';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private users: UsersHealthIndicator,
        private http: HttpHealthIndicator,
        private db: SequelizeHealthIndicator,
        private configService: ConfigService,
    ) { }

    @Get("http")
    @HealthCheck()
    checkHttp() {
        return this.health.check([
            () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')
        ]);
    }

    @Get("db")
    @HealthCheck()
    checkDatabase() {
        const dbName = this.configService.get<string>("DB_NAME");
        return this.health.check([
            () => this.db.pingCheck(dbName)
        ]);
    }

    @Get("users")
    @HealthCheck()
    checkProducts() {
        return this.health.check([
            () => this.users.isHealthy()
        ]);
    }
}
