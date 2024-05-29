import {
  AuthResponseDto,
  CreateUserRequestDto,
  CreateUserResponseDto,
  SaveLoginRequestDto,
  SaveLoginResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  UserDto,
  CreateTodoItemRequestDto,
  CreateTodoListRequestDto,
  CreateTodoListResponseDto,
  DeleteTodoListRequestDto,
  DeleteTodoListResponseDto,
  GetUsersTodoListRequestDto,
  GetUsersTodoListResponseDto,
  GetUsersTodoListsRequestDto,
  GetUsersTodoListsResponseDto,
  UpdateTodoListRequestDto,
  GetUsersTodoListsResponseWithItemsDto,
  TodoItemDto,
  UpdateTodoItemRequestDto,
  UserRegisterRequestDto,
  UserRegisterResponseDto,
  AdminRegisterRequestDto,
  AdminRegisterResponseDto,
  CredentialsDto,
} from '@/dto';

export interface IUserDatabase {
  findUserByUserId(userId: string): Promise<UserDto>;

  findUserByEmail(email: string): Promise<UserDto>;

  updateUser(
    userId: string,
    newUser: Partial<UpdateUserRequestDto>,
  ): Promise<UpdateUserResponseDto>;
}

export interface ITodoDatabase {
  createTodoList(
    createTodoListDto: CreateTodoListRequestDto,
  ): Promise<Partial<CreateTodoListResponseDto>>;

  getUsersTodoLists(
    req: GetUsersTodoListsRequestDto,
  ): Promise<GetUsersTodoListsResponseDto[]>;

  getUsersTodoListsWithItems(
    req: GetUsersTodoListsRequestDto,
  ): Promise<GetUsersTodoListsResponseWithItemsDto[]>;

  getUsersTodoList(
    req: GetUsersTodoListRequestDto,
  ): Promise<GetUsersTodoListResponseDto>;

  updateTodoList(
    req: UpdateTodoListRequestDto,
  ): Promise<Partial<CreateTodoListResponseDto>>;

  deleteTodoList(
    req: DeleteTodoListRequestDto,
  ): Promise<DeleteTodoListResponseDto>;

  createTodoItem(req: CreateTodoItemRequestDto): Promise<TodoItemDto>;

  updateTodoItem(req: UpdateTodoItemRequestDto): Promise<TodoItemDto>;
}

export interface IAuth {
  saveUser(user: UserRegisterRequestDto): Promise<UserRegisterResponseDto>;

  saveAdmin(user: AdminRegisterRequestDto): Promise<AdminRegisterResponseDto>;

  userExists(email: string): Promise<boolean>;

  checkCredentials(credentials: CredentialsDto): Promise<boolean>;

  getUserIdByEmail(email: string): Promise<string>;

  getAdminIdByEmail(email: string): Promise<string>;

  // saveLogin(login: SaveLoginRequestDto): Promise<SaveLoginResponseDto>;

  // logout(userId: string): Promise<boolean>;

  // findAuthByRefreshToken(
  //   refreshToken: string,
  // ): Promise<Partial<AuthResponseDto>>;
}
