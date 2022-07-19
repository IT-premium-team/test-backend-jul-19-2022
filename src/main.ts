import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import {
  setupSwagger,
  setupGrasefulShutdown,
  setupModuleHotReload,
  setupVersioning
} from "./_setup";

declare const module: any;

const PORT = 4000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn'],
    });

    app.useGlobalPipes(new ValidationPipe());

    setupSwagger(app);
    setupVersioning(app);
    setupModuleHotReload(module, app);
    setupGrasefulShutdown(app);

    await app.listen(PORT);
}
bootstrap();
