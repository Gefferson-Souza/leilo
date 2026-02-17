import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@leilao-go/backend-infrastructure';
import { Auction } from './auction.entity';

@Entity('auctioneers')
export class Auctioneer extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column({ name: 'base_url' })
  baseUrl!: string;

  @Column({
    name: 'fee_percent',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0.05,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  feePercent!: number;

  @OneToMany(() => Auction, (auction) => auction.auctioneer, {
    cascade: true,
  })
  auctions!: Auction[];
}
