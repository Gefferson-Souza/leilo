import { ApiProperty } from '@nestjs/swagger';
import { AuctionStatus } from '../enums/auction-status.enum';

export class AuctionResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id!: string;

  @ApiProperty({ example: 'REF-123' })
  externalRef!: string;

  @ApiProperty({ example: '2023-10-25T10:00:00.000Z' })
  startDate!: Date;

  @ApiProperty({ enum: AuctionStatus, example: AuctionStatus.SCHEDULED })
  status!: AuctionStatus;

  @ApiProperty({ example: '2023-10-20T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2023-10-20T10:00:00.000Z' })
  updatedAt!: Date;
}
