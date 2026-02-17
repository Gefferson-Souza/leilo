import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuctionService } from '../services/auction.service';
import { AuctionResponseDto } from '../dtos/auction-response.dto';
import { LotResponseDto } from '../dtos/lot-response.dto';
import { AuctionStatus } from '../enums/auction-status.enum';

@ApiTags('Auctions')
@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Get()
  @ApiOperation({ summary: 'List Auctions' })
  @ApiResponse({
    status: 200,
    description: 'List of auctions',
    type: [AuctionResponseDto],
  })
  @ApiQuery({ name: 'status', enum: AuctionStatus, required: false })
  async findAll(@Query('status') status?: AuctionStatus): Promise<AuctionResponseDto[]> {
    const auctions = await this.auctionService.findAll(status);
    // Mapper can be used here, but for MVP we cast or assume entity matches DTO structure sufficiently or use plainToInstance
    // Entities have date objects, DTOs expect Dates. TypeORM returns entities.
    // We should return them directly; NestJS serialization will handle Date -> ISO string.
    return auctions as unknown as AuctionResponseDto[];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get One Auction' })
  @ApiResponse({
    status: 200,
    description: 'The auction',
    type: AuctionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Auction not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<AuctionResponseDto> {
    const auction = await this.auctionService.findOne(id);
    return auction as unknown as AuctionResponseDto;
  }

  @Get(':id/lots')
  @ApiOperation({ summary: 'List Lots for an Auction' })
  @ApiResponse({
    status: 200,
    description: 'List of lots',
    type: [LotResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Auction not found' })
  async findLots(@Param('id', ParseUUIDPipe) id: string): Promise<LotResponseDto[]> {
    const lots = await this.auctionService.findLots(id);
    return lots as unknown as LotResponseDto[];
  }
}
