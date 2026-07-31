export interface getArtisanById_InputType {
  artisan_id: string;
}

export interface getArtisanCompletedBookings_InputType {
  artisan_id: string;
  limit?: number | undefined;
  page?: number | undefined;
}

export interface getArtisanReviews_InputType {
  artisan_id: string;
  limit?: number | undefined;
  page?: number | undefined;
}

export interface getArtisans_InputType {
  limit?: number | undefined;
  page?: number | undefined;
  search_term?: string | undefined;
  location?: string | undefined;
  experience?: number | undefined;
  min_rating?: number | undefined;
}

export interface getArtisans_WhereType {
  rating?: {};
  experience?: {};
  location?: string;
  OR?: {}[];
  user: {};
}
