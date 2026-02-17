import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuctionRepository } from '../repositories/auction.repository';
import { AuctioneerRepository } from '../repositories/auctioneer.repository';
import { LotRepository } from '../repositories/lot.repository';
import { CreateAuctionDto } from '../dtos/create-auction.dto';
import { CreateLotDto } from '../dtos/create-lot.dto';
import { Auction } from '../entities/auction.entity';
import { Lot } from '../entities/lot.entity';
import { AuctionStatus } from '../enums/auction-status.enum';

@Injectable()
export class AuctionService {
  constructor(
    private readonly auctionRepository: AuctionRepository,
    private readonly auctioneerRepository: AuctioneerRepository,
    private readonly lotRepository: LotRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async registerAuction(dto: CreateAuctionDto): Promise<Auction> {
    // 1. Check if Auctioneer exists by name. If not, create it.
    let auctioneer = await this.auctioneerRepository.findByName(dto.name);

    if (!auctioneer) {
      auctioneer = await this.auctioneerRepository.createOrUpdate({
        name: dto.name,
        baseUrl: dto.baseUrl,
      });
    }

    // 2. Check if Auction exists by externalRef.
    const existingAuction = await this.auctionRepository.findByExternalRef(
      dto.externalRef
    );

    if (existingAuction) {
      // If it exists: Update status and startDate.
      existingAuction.status = dto.status || existingAuction.status;
      existingAuction.startDate = new Date(dto.startDate);
      // Ensure correct auctioneer is linked (though likely same)
      existingAuction.auctioneer = auctioneer;
      return this.auctionRepository.save(existingAuction);
    }

    // If new: Create new Auction linked to the Auctioneer.
    const newAuction = await this.auctionRepository.create({
      externalRef: dto.externalRef,
      startDate: new Date(dto.startDate),
      status: dto.status,
      auctioneer: auctioneer,
    });
    return newAuction;
  }

  async processLot(auctionId: string, dto: CreateLotDto): Promise<Lot> {
    // 1. Find the Auction by ID. Throw error if not found.
    const auction = await this.auctionRepository.findById(auctionId);
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${auctionId} not found`);
    }

    // 2. Check if Lot exists in this auction (by code).
    const existingLots = await this.lotRepository.findByAuctionId(auctionId);
    const existingLot = existingLots.find((l) => l.code === dto.code);

    if (existingLot) {
      // If exists: Update currentBid.
      const oldBid = Number(existingLot.currentBid);
      const newBid = Number(dto.currentBid);

      if (oldBid !== newBid) {
        // Check if bid changed. If yes, log internally (or prepare to emit event).
        // For now, we update.
        await this.lotRepository.updateBid(existingLot.id, newBid);
        // We could emit event here: this.eventEmitter.emit('bid.updated', { lotId: existingLot.id, newBid });
        // Update local object for return
        existingLot.currentBid = newBid;
      }
      return existingLot;
    }

    // If new: Create new Lot.
    const newLot = await this.lotRepository.create({
      code: dto.code,
      rawTitle: dto.rawTitle,
      currentBid: dto.currentBid,
      rawHtmlData: dto.rawHtmlData,
      auction: auction,
    });

    return newLot;
  }

  async findAll(status?: AuctionStatus): Promise<Auction[]> {
    return this.auctionRepository.findAll(status);
  }

  async findOne(id: string): Promise<Auction> {
    const auction = await this.auctionRepository.findById(id);
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }
    return auction;
  }

  async findLots(auctionId: string): Promise<Lot[]> {
    const auction = await this.auctionRepository.findById(auctionId);
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${auctionId} not found`);
    }
    return this.lotRepository.findByAuctionId(auctionId);
  }
}
