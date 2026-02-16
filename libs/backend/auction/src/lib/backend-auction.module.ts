import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Auction } from './entities/auction.entity';
import { Auctioneer } from './entities/auctioneer.entity';
import { Lot } from './entities/lot.entity';

import { AuctionRepository } from './repositories/auction.repository';
import { AuctioneerRepository } from './repositories/auctioneer.repository';
import { LotRepository } from './repositories/lot.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Auctioneer, Lot])],
  controllers: [],
  providers: [AuctionRepository, AuctioneerRepository, LotRepository],
  exports: [AuctionRepository, AuctioneerRepository, LotRepository],
})
export class BackendAuctionModule {}
