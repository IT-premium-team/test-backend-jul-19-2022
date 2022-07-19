import { Injectable, Logger } from "@nestjs/common";
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";
import { UsersService } from "./users.service";

@Injectable()
export class UsersHealthIndicator extends HealthIndicator {
    private readonly logger = new Logger(UsersHealthIndicator.name);

    constructor(
        private usersService: UsersService,
    ) {
        super();
    }

    async isHealthy(): Promise<HealthIndicatorResult> {
        const users = await this.usersService.getAll();
        const isHealthy = users.length > 0;
        const result = this.getStatus("getAll", isHealthy);

        if (isHealthy) {
            return result;
        }

        this.logger.error("getAll failed: Database is empty");
        throw new HealthCheckError("Database is empty", result);
    }
}