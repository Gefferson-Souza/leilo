import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Auction } from '../entities/auction.entity';
import { AuctionStatus } from '../enums/auction-status.enum';

@Injectable()
export class AuctionRepository {
  constructor(
    @InjectRepository(Auction)
    private readonly repository: Repository<Auction>
  ) {}

  async create(data: Partial<Auction>): Promise<Auction> {
    const auction = this.repository.create(data);
    return this.repository.save(auction);
  }

  async findByExternalRef(ref: string): Promise<Auction | null> {
    return this.repository.findOne({
      where: { externalRef: ref },
      relations: ['auctioneer', 'lots'],
    });
  }

  async findActiveAuctions(): Promise<Auction[]> {
    return this.repository.find({
      where: {
        status: In([AuctionStatus.LIVE, AuctionStatus.SCHEDULED]),
      },
      relations: ['auctioneer'],
    });
  }

  async findById(id: string): Promise<Auction | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['lots'],
    });
  }

  async save(auction: Auction): Promise<Auction> {
    return this.repository.save(auction);
  }
}
