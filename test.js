const DEFAULT_SAVINGS_RATE = 0.0007;
const INVESTING_RATE = 0.07;
const YEARS = 30;
const MAX_DEPOSIT = 200000;
const GRAPH_HEADROOM_MULTIPLIER = 1.03;

function calculateFutureValue(
  monthlyDeposit,
  annualRate,
  years,
) {
  const periods = 12 * years;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  return Math.round(
    monthlyDeposit *
      ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate) *
      (1 + monthlyRate),
  );
}

const maxInv = calculateFutureValue(MAX_DEPOSIT, INVESTING_RATE, YEARS);
console.log("Max Inv:", maxInv);

const maxSav = calculateFutureValue(MAX_DEPOSIT, DEFAULT_SAVINGS_RATE, YEARS);
console.log("Max Sav:", maxSav);

console.log("Inv at 200,000:", maxInv);
console.log("Ratio:", maxInv / (maxInv * 1.03));
