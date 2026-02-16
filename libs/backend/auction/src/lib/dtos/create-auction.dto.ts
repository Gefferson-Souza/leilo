import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';
import { AuctionStatus } from '../enums/auction-status.enum';

export class CreateAuctionDto {
  @IsString()
  @IsNotEmpty()
  externalRef!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUrl()
  @IsNotEmpty()
  baseUrl!: string;

  @IsISO8601()
  @IsNotEmpty()
  startDate!: Date;

  @IsEnum(AuctionStatus)
  @IsOptional()
  status?: AuctionStatus;
}
