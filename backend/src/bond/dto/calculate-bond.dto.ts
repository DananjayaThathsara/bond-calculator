import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min, Max, IsEnum } from 'class-validator';

// represents the allowed values for how often a bond pays its coupon
export enum CouponFrequency {
  ANNUAL = 'annual',
  SEMI_ANNUAL = 'semi-annual',
}

// Data transfer object used when calculating a bond's yield
export class CalculateBondDto {
  // the nominal (par) value that will be repaid at maturity
  @ApiProperty({
    description: 'Face value of the bond',
    example: 1000,
  })
  @IsNumber({}, { message: 'faceValue must be a number' })
  @IsPositive({ message: 'faceValue must be greater than 0' })
  faceValue: number;

  // annual interest rate paid by the bond, expressed as a percentage
  @ApiProperty({
    description: 'Annual coupon rate as percentage',
    example: 6,
  })
  @IsNumber({}, { message: 'couponRate must be a number' })
  @Min(0, { message: 'couponRate cannot be less than 0' })
  @Max(100, { message: 'couponRate cannot exceed 100' })
  couponRate: number;

  // the price at which the bond is currently trading in the market
  @ApiProperty({
    description: 'Current market price of the bond',
    example: 950,
  })
  @IsNumber({}, { message: 'marketPrice must be a number' })
  @IsPositive({ message: 'marketPrice must be greater than 0' })
  marketPrice: number;

  // number of years remaining before the bond reaches maturity
  @ApiProperty({
    description: 'Years until bond matures',
    example: 3,
  })
  @IsNumber({}, { message: 'yearsToMaturity must be a number' })
  @IsPositive({ message: 'yearsToMaturity must be greater than 0' })
  yearsToMaturity: number;

  // frequency at which coupon payments occur during the year
  @ApiProperty({
    description: 'How often coupon is paid',
    example: 'semi-annual',
    enum: CouponFrequency,
  })
  @IsEnum(CouponFrequency, {
    message: 'couponFrequency must be either "annual" or "semi-annual"',
  })
  couponFrequency: CouponFrequency;
}
