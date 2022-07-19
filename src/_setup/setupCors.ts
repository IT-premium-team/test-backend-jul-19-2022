import { INestApplication } from "@nestjs/common";

export const setupCors = (app: INestApplication): void => {
    // @FIXME: for test only
    app.enableCors({ origin: '*' });
};