export interface getAdminUser_InputType {
  email: string;
  password: string;
}

export interface createAdminUser_InputType {
  email: string;
  password: string;
  name: string;
}

export interface getAdminUserById_InputType {
  admin_id: string;
}
