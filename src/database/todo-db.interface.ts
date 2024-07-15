import { CreateTodoItemRequestDto, CreateTodoListRequestDto, CreateTodoListResponseDto, DeleteTodoListRequestDto, DeleteTodoListResponseDto, GetUsersTodoListRequestDto, GetUsersTodoListResponseDto, GetUsersTodoListsRequestDto, GetUsersTodoListsResponseDto, GetUsersTodoListsResponseWithItemsDto, TodoItemDto, UpdateTodoItemRequestDto, UpdateTodoListRequestDto } from "@/dto";

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
