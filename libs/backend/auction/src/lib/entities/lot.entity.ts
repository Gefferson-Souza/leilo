import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@leilao-go/backend-infrastructure';
import { LotStatus } from '../enums/lot-status.enum';
import { Auction } from './auction.entity';

@Entity('lots')
export class Lot extends BaseEntity {
  @Column()
  code!: string;

  @Column({ name: 'raw_title' })
  rawTitle!: string;

  @Column({
    name: 'current_bid',
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  currentBid!: number;

  @Column({ name: 'raw_html_data', type: 'jsonb', nullable: true })
  rawHtmlData: any;

  @Column({
    type: 'enum',
    enum: LotStatus,
    default: LotStatus.OPEN,
  })
  status!: LotStatus;

  @ManyToOne(() => Auction, (auction) => auction.lots, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'auction_id' })
  auction!: Auction;
}
