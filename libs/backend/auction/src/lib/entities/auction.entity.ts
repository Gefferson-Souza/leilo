import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '@leilao-go/backend-infrastructure';
import { AuctionStatus } from '../enums/auction-status.enum';
import { Auctioneer } from './auctioneer.entity';
import { Lot } from './lot.entity';

@Entity('auctions')
export class Auction extends BaseEntity {
  @Column({ unique: true })
  externalRef!: string;

  @Column({ type: 'timestamptz' })
  startDate!: Date;

  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.SCHEDULED,
  })
  status!: AuctionStatus;

  @ManyToOne(() => Auctioneer, (auctioneer) => auctioneer.auctions, {
    nullable: false,
  })
  @JoinColumn({ name: 'auctioneer_id' })
  auctioneer!: Auctioneer;

  @OneToMany(() => Lot, (lot) => lot.auction, {
    cascade: true,
  })
  lots!: Lot[];
}
