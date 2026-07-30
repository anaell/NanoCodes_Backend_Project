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
