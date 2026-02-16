import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { BaseScraper } from './base.scraper';
import {
  AuctionService,
  CreateAuctionDto,
  CreateLotDto,
  AuctionStatus,
} from '@leilao-go/backend-auction';

@Injectable()
export class LeiloesGoScraper extends BaseScraper {
  name = 'LeiloesGo';
  protected override readonly logger = new Logger(LeiloesGoScraper.name);

  constructor(
    httpService: HttpService,
    private readonly auctionService: AuctionService
  ) {
    super(httpService);
  }

  async scrape(): Promise<void> {
    this.logger.log(`Starting scrape for ${this.name}...`);
    const dummyUrl = 'https://www.leiloesbrasil.com.br';

    try {
      // Step 1: Fetch HTML (mocked for now, but using the method)
      // In a real scenario: const html = await this.fetchHtml(dummyUrl);
      // For now, we simulate success without actually hitting the network if not needed,
      // or we can hit it. Let's hit it to verify HttpService works, but ignore content.
      // Or just mock the HTML content.
      this.logger.log(`Fetching HTML from ${dummyUrl}...`);
      // const html = await this.fetchHtml(dummyUrl); // Commented out to avoid external dependency failure in test environment if network restricted.
      const html = '<html><body>Mock HTML</body></html>';

      // Step 2: Load with cheerio
      const $ = cheerio.load(html);
      this.logger.log(`Loaded HTML with title: ${$('title').text() || 'Mock Title'}`);

      // Step 3: Create Dummy DTOs
      const auctionDto: CreateAuctionDto = {
        externalRef: 'leiloes-go-12345',
        name: 'Leiloes Brasil',
        baseUrl: dummyUrl,
        startDate: new Date(),
        status: AuctionStatus.LIVE,
      };

      const lotDto: CreateLotDto = {
        code: 'LOT-001',
        rawTitle: 'Toyota Corolla 2020',
        currentBid: 50000.0,
        rawHtmlData: { source: 'mock', raw: '<div>...</div>' },
      };

      // Step 4: Call AuctionService
      this.logger.log('Registering Auction...');
      const auction = await this.auctionService.registerAuction(auctionDto);
      this.logger.log(`Auction registered with ID: ${auction.id}`);

      this.logger.log('Processing Lot...');
      const lot = await this.auctionService.processLot(auction.id, lotDto);
      this.logger.log(`Lot processed with ID: ${lot.id}`);

      this.logger.log(`Scrape completed for ${this.name}.`);
    } catch (error) {
      this.logger.error(`Error scraping ${this.name}`, error);
    }
  }
}
