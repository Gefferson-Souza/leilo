import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auctioneer } from '../entities/auctioneer.entity';

@Injectable()
export class AuctioneerRepository {
  constructor(
    @InjectRepository(Auctioneer)
    private readonly repository: Repository<Auctioneer>
  ) {}

  async findByName(name: string): Promise<Auctioneer | null> {
    return this.repository.findOne({ where: { name } });
  }

  async createOrUpdate(data: Partial<Auctioneer>): Promise<Auctioneer> {
    const existing = await this.findByName(data.name || '');

    if (existing) {
      // Update logic if needed, or just return existing
      return this.repository.save({ ...existing, ...data });
    }

    const auctioneer = this.repository.create(data);
    return this.repository.save(auctioneer);
  }
}
