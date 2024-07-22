import { AdminRegisterRequestDto, AdminRegisterResponseDto, CredentialsDto } from "@/common/dto";

export interface IUserDBAuth {
  register(user: any): Promise<any>;
  register3rdParty(user: any): Promise<any>;

  // saveAdmin(user: AdminRegisterRequestDto): Promise<AdminRegisterResponseDto>;

  // userExists(email: string): Promise<boolean>;

  // checkCredentials(credentials: CredentialsDto): Promise<boolean>;

  // getUserIdByEmail(email: string): Promise<string>;

  // getAdminIdByEmail(email: string): Promise<string>;

  // saveRefreshToken(
  //   isAdmin: boolean,
  //   refreshToken: string,
  //   userId: string,
  // ): Promise<void>;

  // deleteRefreshToken(refreshToken: string): Promise<any>;

  // checkRefreshToken(refreshToken: string): Promise<boolean>;

  // changePassword(
  //   isAdmin: boolean,
  //   userId: string,
  //   password: string,
  //   newPassword: string,
  // ): Promise<boolean>;
}
