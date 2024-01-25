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
} from '@/dto';

export interface IUserDatabase {
  save(user: CreateUserRequestDto): Promise<CreateUserResponseDto>;

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

  updateTodoItem(req: CreateTodoItemRequestDto): Promise<TodoItemDto>;
}

export interface IAuth {
  saveLogin(login: SaveLoginRequestDto): Promise<SaveLoginResponseDto>;

  logout(userId: string): Promise<boolean>;

  findAuthByRefreshToken(
    refreshToken: string,
  ): Promise<Partial<AuthResponseDto>>;
}
