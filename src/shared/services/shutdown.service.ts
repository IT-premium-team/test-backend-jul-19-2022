import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { Subject } from "rxjs";

type TShutdownFunc = (() => void) | (() => Promise<void>);

@Injectable()
export class ShutdownService implements OnModuleDestroy {
    private shutdownListener$: Subject<void> = new Subject();

    subscribeToShutdown(shutdownFn: TShutdownFunc): void {
        this.shutdownListener$.subscribe(() => shutdownFn());
    }

    shutdown() {
        this.shutdownListener$.next();
        this.shutdownListener$.complete();
    }

    onModuleDestroy() {
        console.info("... shutting down ...");
    }
}