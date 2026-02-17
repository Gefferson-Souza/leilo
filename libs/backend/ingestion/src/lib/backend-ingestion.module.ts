import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { BackendAuctionModule } from '@leilao-go/backend-auction';
import { IngestionService } from './services/ingestion.service';
import { LeiloesGoScraper } from './scrapers/leiloes-go.scraper';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    BackendAuctionModule,
  ],
  controllers: [],
  providers: [IngestionService, LeiloesGoScraper],
  exports: [IngestionService],
})
export class BackendIngestionModule {}
