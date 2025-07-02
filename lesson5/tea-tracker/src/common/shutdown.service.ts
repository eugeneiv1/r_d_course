import { Injectable, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class ShutdownService implements OnApplicationShutdown {
    onApplicationShutdown(signal: string) {
        if (signal === 'SIGINT') {
            console.log('Bye tea‑lovers 👋');
        }
    }
}