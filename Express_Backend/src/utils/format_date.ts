// 1. Match Prisma's native groupBy output shape
interface PrismaGroupResult {
  created_at: Date;
  _count: {
    created_at: number;
  };
}

// 2. Define your clean frontend chart shape
export interface ChartDataPoint {
  date: string; // 'YYYY-MM-DD'
  count: number;
}

export const formatGrowthData = (
  dataArray: PrismaGroupResult[],
): ChartDataPoint[] => {
  const groups: Record<string, number> = {};

  dataArray.forEach((item) => {
    if (!item?.created_at) return;

    // Standardize to YYYY-MM-DD string
    const day = item.created_at.toISOString().split("T")[0];

    // Read Prisma's database tally instead of blindly adding 1
    const databaseCount = item._count?.created_at || 0;

    // This safely adds counts together if multiple records share a day
    if (day) groups[day] = (groups[day] || 0) + databaseCount;
  });

  // Convert the key-value dictionary into a clean array
  return Object.entries(groups).map(
    ([date, count]): ChartDataPoint => ({
      date,
      count,
    }),
  );
};

export function getToday() {
  const full_date = new Date();
  const year = full_date.getUTCFullYear();
  const month = full_date.getUTCMonth();
  const date = full_date.getUTCDay();

  const today = new Date(year, month, date);

  return today;
}

interface revenue_trend_data_input_type {
  payment_completed_at: Date;
  _sum: { amount: number | null };
}

export interface formatRevenueTrendData_OutputType {
  date: string; // 'YYYY-MM'
  sum: number;
}

export function formatRevenueTrendData(
  data_to_format: revenue_trend_data_input_type[],
): formatRevenueTrendData_OutputType[] {
  const formatted_data: Record<string, number> = {};

  data_to_format.forEach((data) => {
    if (!data.payment_completed_at) return;

    // 1. Get 'YYYY-MM-DD'
    const normalized_date = data.payment_completed_at.toISOString();
    const year_month_day_date_format = normalized_date.split("T")[0];
    if (!year_month_day_date_format) return;

    // 2. Extract just the Year and Month ('YYYY-MM')
    const date_parts = year_month_day_date_format.split("-"); // ['YYYY', 'MM', 'DD']
    const date_to_use = `${date_parts[0]}-${date_parts[1]}`; // 'YYYY-MM'

    const amount = data._sum.amount || 0;

    // 3. Accumulate the values into the Record object
    formatted_data[date_to_use] = (formatted_data[date_to_use] || 0) + amount;
  });

  // 4. Convert the Record object back into the array expected by your interface
  return Object.entries(formatted_data).map(
    ([date, sum]): formatRevenueTrendData_OutputType => ({
      date,
      sum,
    }),
  );
}
