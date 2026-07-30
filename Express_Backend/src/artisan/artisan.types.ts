import { string } from "zod";

export interface getArtisanById_InputType {
  artisan_id: string;
}

export interface getArtisanIncomingJobRequests_InputType {
  artisan_id: string;
}

export interface artisanBookingRequestResponse_InputType {
  artisan_id: string;
  booking_id: string;
  artisan_booking_response: "accepted" | "rejected";
}

export interface getArtisanBookingHistory_InputType {
  artisan_id: string;
  no_of_days?: number | undefined;
  booking_status?:
    | "pending"
    | "accepted"
    | "rejected"
    | "in_progress"
    | "cancelled"
    | "completed"
    | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface getArtisanBookingHistory_WhereType {
  artisan_id: string;
  created_at?: {};
  status?:
    | "pending"
    | "accepted"
    | "rejected"
    | "in_progress"
    | "cancelled"
    | "completed";
}

export interface getArtisanReviewsAndRating_InputType {
  artisan_id: string;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface getArtisanReviewAndRatingStats_InputType {
  artisan_id: string;
}

export interface createOrUpdateArtisanReplyToReview_InputType {
  artisan_id: string;
  review_id: string;
  reply: string;
}

export interface getArtisanEarningsStatsCard_InputType {
  artisan_id: string;
}

export interface getArtisanTransactions_InputType {
  artisan_id: string;
  recent?: boolean | undefined;
}

export interface getArtisanEarningsTrendData_InputType {
  artisan_id: string;
  no_of_days: number;
}
