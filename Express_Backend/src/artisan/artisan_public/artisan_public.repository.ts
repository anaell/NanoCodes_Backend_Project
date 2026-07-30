import { prisma } from "../../lib/prisma.js";

export class PublicArtisanRepository {
  async getFeaturedArtisans() {
    try {
      const featured_artisan = await prisma.artisan.findMany({
        where: {
          user: { is_deleted: false, is_suspended: false },
          rating: { gte: 4.7 },
        },
        orderBy: { rating: "desc" },
        take: 5,
        select: {
          user: {
            select: { profile_pic_url: true, f_name: true, l_name: true },
          },
          location: true,
          main_skill: true,
          rating: true,
        },
      });

      return { featured_artisan };
    } catch (error) {
      // Successfully passes the error up to the service/controller layer
      throw error;
    }
  }
}
