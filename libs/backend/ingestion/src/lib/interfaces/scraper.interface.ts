export interface IScraper {
  name: string;
  scrape(): Promise<void>;
}
