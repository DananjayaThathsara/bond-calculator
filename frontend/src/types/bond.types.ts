export interface BondInput {
  faceValue: number;
  couponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: "annual" | "semi-annual";
}

export interface CashFlowRow {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface BondResult {
  currentYield: number;
  ytm: number;
  totalInterest: number;
  status: "PREMIUM" | "DISCOUNT" | "PAR";
  cashFlowSchedule: CashFlowRow[];
}
