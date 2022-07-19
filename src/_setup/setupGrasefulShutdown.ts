import { INestApplication } from "@nestjs/common";
import { ShutdownService } from "../shared/services";

export const setupGrasefulShutdown = (app: INestApplication): void => {
    app.enableShutdownHooks();
    const shutDownService = app.get(ShutdownService);
    shutDownService.subscribeToShutdown(() => app.close());
};