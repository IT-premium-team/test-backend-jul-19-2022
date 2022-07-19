import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication): void => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle("Test API App")
        .setDescription("My Awesobe API App")
        .setVersion("1.0")
        .build();

    const swaggerOptions: SwaggerDocumentOptions =  {
        operationIdFactory: (
            controllerKey: string,
            methodKey: string
        ) => `${controllerKey}#${methodKey}`
    };

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);
    SwaggerModule.setup("api/docs", app, swaggerDocument);
};