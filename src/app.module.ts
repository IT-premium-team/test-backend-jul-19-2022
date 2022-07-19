import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from "@nestjs/sequelize";
import { Dialect } from "sequelize/types";
import { SharedModule } from "./shared/shared.module";
import { HealthModule } from "./health/health.module";
import { UsersController } from "./users/users.controller";

@Module({
  imports: [
		SequelizeModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				username: config.get<string>("DB_USER"),
				password: config.get<string>("DB_PASS"),
				database: config.get<string>("DB_NAME"),
				host: config.get<string>("DB_HOST", "localhost"),
				port: config.get<number>("DB_PORT", 5432),
				dialect: config.get<Dialect>("DB_DIALECT", "postgres"),
				autoLoadModels: true,
    			synchronize: true,
				pool: {
					max: 5,
					min: 0,
					acquire: 30000,
					idle: 10000
				}
			})
		}),
		UsersModule,
		HealthModule,
		SharedModule,
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
		}),
	],
	controllers: [AppController, UsersController],
	providers: [AppService]
})
export class AppModule {}
