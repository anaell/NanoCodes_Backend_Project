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
