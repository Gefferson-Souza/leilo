import { ApiProperty } from '@nestjs/swagger';
import { LotStatus } from '../enums/lot-status.enum';

export class LotResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  id!: string;

  @ApiProperty({ example: 'LOT-001' })
  code!: string;

  @ApiProperty({ example: 'Toyota Corolla 2020' })
  rawTitle!: string;

  @ApiProperty({ example: 50000.0 })
  currentBid!: number;

  @ApiProperty({ enum: LotStatus, example: LotStatus.OPEN })
  status!: LotStatus;

  @ApiProperty({
    example: { source: 'LeiloesGo', raw: '...' },
    required: false,
  })
  rawHtmlData?: object;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  auctionId!: string;

  @ApiProperty({ example: '2023-10-20T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2023-10-20T10:00:00.000Z' })
  updatedAt!: Date;
}
