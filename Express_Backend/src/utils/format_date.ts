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
