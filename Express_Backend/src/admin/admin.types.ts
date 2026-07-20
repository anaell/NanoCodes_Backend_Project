export interface getPlatformUsers_InputType {
  role?: "artisan" | "user" | undefined;
  search_term?: string | undefined;
  status?: boolean | undefined;
  artisan_document_verification_status?:
    | "pending"
    | "accepted"
    | "rejected"
    | "more_info_required"
    | undefined;
  page?: number | undefined; // For pagination
  limit?: number | undefined; // For pagination
}

export interface getPlatformUsers_WhereType {
  role?: "artisan" | "user";
  status?: boolean;
  is_deleted: boolean;
  OR?: {}[];
  is_suspended?: boolean;
  artisan?: {};
}

export interface reviewArtisanDocumentVerificationRequest_InputType {
  artisan_id: string;
  application_status_chosen: "accepted" | "rejected" | "more_info_required";
}

export interface deletePlatformUser_InputType {
  user_id: string;
}

export interface delete_User_Artisan_Account_InputType {
  artisan_id: string;
}

export interface getArtisanPendingDocumentVerificationRequest_InputType {
  artisan_id: string;
}

export interface getAllBookings_InputType {
  search_term?: string | undefined;
  status?:
    | "pending"
    | "accepted"
    | "rejected"
    | "in_progress"
    | "cancelled"
    | "completed"
    | undefined;
  no_of_days?: number | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface getAllBookings_WhereType {
  status?:
    | "pending"
    | "accepted"
    | "rejected"
    | "in_progress"
    | "cancelled"
    | "completed";
  is_cancelled: boolean;
  OR?: {}[];
  created_at?: {};
}

export interface getAllReviews_InputType {
  search_term?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
  reported_reviews?: boolean | undefined;
}

export interface getAllReviews_WhereType {
  OR?: {}[];
  reply?: {};
}

export interface getAllTransactionLogs_InputType {
  search_term?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface getAllTransactionLogs_WhereType {
  OR: {}[];
  booking: {};
}

export interface getRevenueTrend_InputType {
  days?: number | undefined;
}

export interface updatePlatformSettings_InputType {
  new_platform_name: string;
  new_support_email_address: string;
  maintenance_mode: boolean;
  new_platform_logo_url: string;
}
