import { Module } from '@nestjs/common';
import { TeaModule } from './tea/tea.module';
import { APP_GUARD } from '@nestjs/core';
import { XApiKeyGuard } from './common/x-api-key.guard';
import {ShutdownService} from "./common/shutdown.service";

@Module({
  imports: [TeaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: XApiKeyGuard,
    },
    ShutdownService
  ],
})
export class AppModule {}
