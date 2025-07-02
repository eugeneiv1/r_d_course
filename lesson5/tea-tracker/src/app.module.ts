import { Module } from '@nestjs/common';
import { TeaModule } from './tea/tea.module';
import { APP_GUARD } from '@nestjs/core';
import { XApiKeyGuard } from './common/x-api-key.guard';

@Module({
  imports: [TeaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: XApiKeyGuard,
    },
  ],
})
export class AppModule {}
