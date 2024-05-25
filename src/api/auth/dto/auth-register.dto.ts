
export class CreateUserRequestDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}


export class CreateAdminRequestDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
}

export type UserRequestDto =
	| CreateUserRequestDto
	| CreateAdminRequestDto; 



export class CreateUserResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export class CreateAdminResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export type UserResponseDto = CreateUserResponseDto | CreateAdminResponseDto;