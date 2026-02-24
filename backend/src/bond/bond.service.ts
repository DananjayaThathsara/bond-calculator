import { Injectable } from '@nestjs/common';
import { CouponFrequency } from './dto/calculate-bond.dto';

// service providing bond-related calculations
@Injectable()
export class BondService {
  /**
   * Current yield calculation: (annual coupon / market price) * 100
   */
  calculateCurrentYield(
    faceValue: number,
    couponRate: number,
    marketPrice: number,
  ): number {
    const annualCoupon = faceValue * (couponRate / 100);
    const currentYield = (annualCoupon / marketPrice) * 100;
    return parseFloat(currentYield.toFixed(4));
  }

  /**
   * Estimate Yield to Maturity using Newton-Raphson
   */
  calculateYTM(
    faceValue: number,
    couponRate: number,
    marketPrice: number,
    yearsToMaturity: number,
    couponFrequency: CouponFrequency,
  ): number {
    const periodsPerYear =
      couponFrequency === CouponFrequency.SEMI_ANNUAL ? 2 : 1;
    const couponPayment = (faceValue * (couponRate / 100)) / periodsPerYear;
    const totalPeriods = yearsToMaturity * periodsPerYear;

    // initial guess for rate per period
    let rate = couponRate / 100 / periodsPerYear;

    for (let i = 0; i < 1000; i++) {
      let price = 0;
      let derivative = 0;

      for (let t = 1; t <= totalPeriods; t++) {
        price += couponPayment / Math.pow(1 + rate, t);
        derivative += (-t * couponPayment) / Math.pow(1 + rate, t + 1);
      }

      price += faceValue / Math.pow(1 + rate, totalPeriods);
      derivative +=
        (-totalPeriods * faceValue) / Math.pow(1 + rate, totalPeriods + 1);

      // Newton-Raphson update
      rate = rate - (price - marketPrice) / derivative;
    }

    const ytm = rate * periodsPerYear * 100;
    return parseFloat(ytm.toFixed(4));
  }

  /**
   * Total interest over life including capital gain/loss
   */
  calculateTotalInterest(
    faceValue: number,
    couponRate: number,
    marketPrice: number,
    yearsToMaturity: number,
    couponFrequency: CouponFrequency,
  ): number {
    const periodsPerYear =
      couponFrequency === CouponFrequency.SEMI_ANNUAL ? 2 : 1;
    const couponPayment = (faceValue * (couponRate / 100)) / periodsPerYear;
    const totalPeriods = yearsToMaturity * periodsPerYear;

    const totalCoupons = couponPayment * totalPeriods;
    const capitalGainLoss = faceValue - marketPrice;
    const totalInterest = totalCoupons + capitalGainLoss;
    return parseFloat(totalInterest.toFixed(2));
  }

  /**
   * Premium/Discount/Par status based on market price
   */
  getPremiumDiscountStatus(
    faceValue: number,
    marketPrice: number,
  ): 'PREMIUM' | 'DISCOUNT' | 'PAR' {
    if (marketPrice > faceValue) return 'PREMIUM';
    if (marketPrice < faceValue) return 'DISCOUNT';
    return 'PAR';
  }

  /**
   * Builds cash flow schedule with coupon payments and principal
   */
  generateCashFlowSchedule(
    faceValue: number,
    couponRate: number,
    yearsToMaturity: number,
    couponFrequency: CouponFrequency,
  ) {
    const periodsPerYear =
      couponFrequency === CouponFrequency.SEMI_ANNUAL ? 2 : 1;
    const monthsBetweenPayments = 12 / periodsPerYear;
    const couponPayment = (faceValue * (couponRate / 100)) / periodsPerYear;
    const totalPeriods = yearsToMaturity * periodsPerYear;

    const schedule: Array<{
      period: number;
      paymentDate: string;
      couponPayment: number;
      cumulativeInterest: number;
      remainingPrincipal: number;
    }> = [];

    const startDate = new Date();

    for (let period = 1; period <= totalPeriods; period++) {
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(
        paymentDate.getMonth() + period * monthsBetweenPayments,
      );
      const paymentDateStr = paymentDate.toISOString().split('T')[0];

      const isLast = period === totalPeriods;
      const payment = isLast ? couponPayment + faceValue : couponPayment;
      const cumulativeInterest = parseFloat(
        (couponPayment * period).toFixed(2),
      );
      const remainingPrincipal = isLast ? 0 : faceValue;

      schedule.push({
        period,
        paymentDate: paymentDateStr,
        couponPayment: parseFloat(payment.toFixed(2)),
        cumulativeInterest,
        remainingPrincipal,
      });
    }

    return schedule;
  }
}
