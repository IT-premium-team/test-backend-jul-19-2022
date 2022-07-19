import { Module } from "@nestjs/common";
import { ShutdownService } from "./services";

@Module({
    providers: [ShutdownService],
    exports: [ShutdownService]
})
export class SharedModule {}