import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Feature Modules
import { BackendIngestionModule } from '@leilao-go/backend-ingestion';
import { BackendAuctionModule } from '@leilao-go/backend-auction';
import { BackendCatalogModule } from '@leilao-go/backend-catalog';
import { BackendValuationModule } from '@leilao-go/backend-valuation';
// Shared Modules
import { DatabaseModule } from '@leilao-go/backend-infrastructure';
import { BackendDtosModule } from '@leilao-go/backend-dtos';

@Module({
  imports: [
    // Core Modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),

    // Shared
    DatabaseModule,
    BackendDtosModule,

    // Features
    BackendIngestionModule,
    BackendAuctionModule,
    BackendCatalogModule,
    BackendValuationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
