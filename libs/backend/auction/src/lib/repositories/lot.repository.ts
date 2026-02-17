import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lot } from '../entities/lot.entity';

@Injectable()
export class LotRepository {
  constructor(
    @InjectRepository(Lot)
    private readonly repository: Repository<Lot>
  ) {}

  async create(data: Partial<Lot>): Promise<Lot> {
    const lot = this.repository.create(data);
    return this.repository.save(lot);
  }

  async findByAuctionId(auctionId: string): Promise<Lot[]> {
    return this.repository.find({
      where: { auction: { id: auctionId } },
      order: { code: 'ASC' },
    });
  }

  async updateBid(lotId: string, newBid: number): Promise<void> {
    await this.repository.update(lotId, {
      currentBid: newBid,
    });
  }
}
