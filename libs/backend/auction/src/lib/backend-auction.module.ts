import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Auction } from './entities/auction.entity';
import { Auctioneer } from './entities/auctioneer.entity';
import { Lot } from './entities/lot.entity';

import { AuctionRepository } from './repositories/auction.repository';
import { AuctioneerRepository } from './repositories/auctioneer.repository';
import { LotRepository } from './repositories/lot.repository';

import { AuctionService } from './services/auction.service';

import { AuctionController } from './controllers/auction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Auctioneer, Lot])],
  controllers: [AuctionController],
  providers: [
    AuctionRepository,
    AuctioneerRepository,
    LotRepository,
    AuctionService,
  ],
  exports: [
    AuctionRepository,
    AuctioneerRepository,
    LotRepository,
    AuctionService,
  ],
})
export class BackendAuctionModule {}
