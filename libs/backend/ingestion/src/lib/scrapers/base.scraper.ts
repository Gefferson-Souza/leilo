import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IScraper } from '../interfaces/scraper.interface';
import { Logger } from '@nestjs/common';

export abstract class BaseScraper implements IScraper {
  abstract name: string;
  protected readonly logger = new Logger(BaseScraper.name);

  constructor(protected readonly httpService: HttpService) {}

  abstract scrape(): Promise<void>;

  protected async fetchHtml(url: string): Promise<string> {
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching HTML from ${url}`, error);
      throw error;
    }
  }
}
