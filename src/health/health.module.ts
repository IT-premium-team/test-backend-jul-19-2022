import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { UsersModule } from "src/users/users.module";
import { HealthController } from './health.controller';

@Module({
    imports: [TerminusModule, HttpModule, UsersModule],
    controllers: [HealthController],
})
export class HealthModule {}