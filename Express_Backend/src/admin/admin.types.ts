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
