/* This file is from the code-along dated 2026-02-02. */

export interface UserData {
  access_token: string;
  user: UserClass;
  created: string;
}

export interface UserClass {
  id: string;
  firstname: string;
  lastname: string;
}
