import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  rawTitle!: string;

  @IsNumber()
  @IsPositive()
  currentBid!: number;

  @IsObject()
  @IsOptional()
  rawHtmlData?: Record<string, any>;
}
