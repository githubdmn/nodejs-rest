import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpStatus,
  Inject,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
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
  UpdateTodoItemRequestDto,
  UpdateTodoListRequestDto,
  UpdateTodoListResponseDto,
} from '@/dto';
import { ITodoService } from './todo.interface';
import { TodoList, TodoItem } from '@/entities';
import { TODO_SERVICE } from '@/utils/constants';
import { TodoGuard } from '@/guard';
import { JwtInterceptor } from '@/interceptor';

@ApiTags('Todo')
// @UseGuards(TodoGuard)
@UseInterceptors(JwtInterceptor)
@Controller('todo')
export class TodoController {
  constructor(
    @Inject(TODO_SERVICE) private readonly todoService: ITodoService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Todo List' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created Todo List',
    type: TodoList,
  })
  @ApiBadRequestResponse({ description: 'Failed to create Todo List' })
  async createTodoList(
    @Request() request: any,
    @Body() { userId, ...createTodoListDto }: CreateTodoListRequestDto,
  ): Promise<Partial<CreateTodoListResponseDto>> {
    const createTodoList: CreateTodoListRequestDto = {
      userId: request.jwtPayload.sub,
      ...createTodoListDto,
    };
    return this.todoService.createTodoList(createTodoList);
  }

  @Get('lists')
  @ApiOperation({ summary: "Get all User's Todo Lists" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved Todo Lists',
    type: TodoList,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: "No User's Todo Lists found" })
  async getUsersTodoLists(
    @Request() request: any,
  ): Promise<GetUsersTodoListsResponseDto[]> {
    const req: GetUsersTodoListsRequestDto = {
      userId: request.jwtPayload.sub,
    };
    return this.todoService.getUsersTodoLists(req);
  }

  @Get('list')
  @ApiOperation({ summary: "Get User's Todo List" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved Todo List',
    type: TodoList,
  })
  @ApiNotFoundResponse({ description: 'Todo List not found' })
  async getUsersTodoList(
    @Request() request: any,
    @Body() req: GetUsersTodoListRequestDto,
  ): Promise<GetUsersTodoListResponseDto> {
    req.userId = request.jwtPayload.sub;
    return this.todoService.getUsersTodoList(req);
  }

  @Post(':listId')
  @ApiOperation({ summary: 'Create a new Todo Item within a Todo List' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created Todo Item',
    type: TodoItem,
  })
  @ApiBadRequestResponse({ description: 'Failed to create Todo Item' })
  @ApiNotFoundResponse({ description: 'Todo List not found' })
  async createTodoItem(
    @Request() request: any,
    @Body() req: CreateTodoItemRequestDto,
  ): Promise<TodoItemDto> {
    req.userId = request.jwtPayload.sub;
    return this.todoService.createTodoItem(req);
  }

  @Patch()
  @ApiOperation({ summary: 'Update a Todo Item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated Todo Item',
    type: TodoItem,
  })
  @ApiBadRequestResponse({ description: 'Failed to update Todo Item' })
  @ApiNotFoundResponse({ description: 'Todo Item not found' })
  async updateTodoItem(
    @Request() request: any,
    @Body() req: CreateTodoItemRequestDto,
  ): Promise<TodoItemDto> {
    req.userId = request.jwtPayload.sub;
    return this.todoService.updateTodoItem(req);
  }

  @Delete(':listId')
  @ApiOperation({ summary: 'Delete a Todo List and its Items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted Todo List',
    type: TodoList,
  })
  @ApiBadRequestResponse({ description: 'Failed to delete Todo List' })
  @ApiNotFoundResponse({ description: 'Todo List not found' })
  async deleteTodoList(
    @Request() request: any,
    @Param('listId') listId: string,
  ): Promise<DeleteTodoListResponseDto> {
    return this.todoService.deleteTodoList({
      listId,
      userId: request.jwtPayload.sub,
    });
  }

  @Patch()
  @ApiOperation({ summary: 'Update a Todo List' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated Todo List',
    type: TodoList,
  })
  @ApiBadRequestResponse({ description: 'Failed to update Todo List' })
  @ApiNotFoundResponse({ description: 'Todo List not found' })
  async updateTodoList(
    @Request() request: any,
    @Body() req: UpdateTodoListRequestDto,
  ): Promise<Partial<CreateTodoListResponseDto>> {
    req.userId = request.jwtPayload.sub;
    return this.todoService.updateTodoList(req);
  }
}
