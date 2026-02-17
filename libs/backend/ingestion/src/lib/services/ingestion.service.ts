import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LeiloesGoScraper } from '../scrapers/leiloes-go.scraper';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(private readonly leiloesGoScraper: LeiloesGoScraper) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.log('Starting hourly ingestion job...');
    const startTime = Date.now();

    // Orchestrate all scrapers
    // In a real scenario, this could be an array of scrapers
    await this.leiloesGoScraper.scrape();

    const duration = Date.now() - startTime;
    this.logger.log(`Ingestion job completed in ${duration}ms.`);
  }
}
