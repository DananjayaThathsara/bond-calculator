import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BondService } from './bond.service';
import { CalculateBondDto } from './dto/calculate-bond.dto';

@ApiTags('bond')
@Controller('bond')
export class BondController {
  constructor(private readonly bondService: BondService) {}

  @Post('calculate')
  @ApiOperation({ summary: 'Calculate bond yields and cash flow' })
  @ApiResponse({ status: 200, description: 'Bond calculation successful' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  calculate(@Body() dto: CalculateBondDto) {
    try {
      const currentYield = this.bondService.calculateCurrentYield(
        dto.faceValue,
        dto.couponRate,
        dto.marketPrice,
      );

      const ytm = this.bondService.calculateYTM(
        dto.faceValue,
        dto.couponRate,
        dto.marketPrice,
        dto.yearsToMaturity,
        dto.couponFrequency,
      );

      const totalInterest = this.bondService.calculateTotalInterest(
        dto.faceValue,
        dto.couponRate,
        dto.marketPrice,
        dto.yearsToMaturity,
        dto.couponFrequency,
      );

      const status = this.bondService.getPremiumDiscountStatus(
        dto.faceValue,
        dto.marketPrice,
      );

      const cashFlowSchedule = this.bondService.generateCashFlowSchedule(
        dto.faceValue,
        dto.couponRate,
        dto.yearsToMaturity,
        dto.couponFrequency,
      );

      return {
        currentYield,
        ytm,
        totalInterest,
        status,
        cashFlowSchedule,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred during bond calculation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
