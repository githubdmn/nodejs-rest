import {
  CreateTodoListRequestDto,
  CreateTodoListResponseDto,
  GetUsersTodoListsRequestDto,
  GetUsersTodoListsResponseDto,
  GetUsersTodoListRequestDto,
  GetUsersTodoListResponseDto,
  DeleteTodoListRequestDto,
  DeleteTodoListResponseDto,
  CreateTodoItemRequestDto,
  TodoItemDto,
  UpdateTodoListRequestDto,
  UpdateTodoItemRequestDto,
} from '@/dto';

export interface ITodoService {
  createTodoList(
    req: CreateTodoListRequestDto,
  ): Promise<Partial<CreateTodoListResponseDto>>;

  getUsersTodoLists(
    req: GetUsersTodoListsRequestDto,
  ): Promise<GetUsersTodoListsResponseDto[]>;

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
