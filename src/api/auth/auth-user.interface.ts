
export interface IUserAuth {
  register(
    userRequest: any,
  ): Promise<any>;
  // validateUser(credentials: CredentialsDto): Promise<boolean>;
  // login(email: string): Promise<RefreshTokenResponseDto>;
  // logout(refreshToken: string): Promise<string>;
  // refreshAccessToken(
  //   id: string,
  //   email: string,
  //   refreshToken: string,
  // ): Promise<RefreshTokenResponseDto>;
  // changePassword(
  //   userId: string,
  //   password: string,
  //   newPassword: string,
  // ): Promise<boolean>;
  // resetPassword(
  //   email: string,
  // ): Promise<boolean>;
}
