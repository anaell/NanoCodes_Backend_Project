export function percentage_growth_calculator(
  past_value: number,
  current_value: number,
) {
  const additions = current_value - past_value;
  const percentage_growth = (additions / current_value) * 100;

  return percentage_growth;
}

export function transaction_success_rate_calculator(
  success_number: number,
  failure_number: number,
) {
  const total = success_number + failure_number;

  const success_rate = (success_number / total) * 100;
  return success_rate;
}
