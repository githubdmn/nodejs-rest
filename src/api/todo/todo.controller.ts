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
// import { TodoList, TodoItem } from '@/entities';
import { TODO_SERVICE } from '@/utils/constants';
import { TodoGuard } from '@/guard';

@ApiTags('Todo')
@UseGuards(TodoGuard)
@Controller('todo')
export class TodoController {
//   constructor(
//     @Inject(TODO_SERVICE) private readonly todoService: ITodoService,
//   ) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new Todo List' })
//   @ApiResponse({
//     status: HttpStatus.CREATED,
//     description: 'Successfully created Todo List',
//     type: TodoList,
//   })
//   @ApiBadRequestResponse({ description: 'Failed to create Todo List' })
//   async createTodoList(
//     @Request() request: any,
//     @Body() { userId, ...createTodoListDto }: CreateTodoListRequestDto,
//   ): Promise<Partial<CreateTodoListResponseDto>> {
//     const createTodoList: CreateTodoListRequestDto = {
//       userId: request.jwtPayload.sub,
//       ...createTodoListDto,
//     };
//     return this.todoService.createTodoList(createTodoList);
//   }

//   @Get('lists')
//   @ApiOperation({ summary: "Get all User's Todo Lists" })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: 'Successfully retrieved Todo Lists',
//     type: TodoList,
//     isArray: true,
//   })
//   @ApiNotFoundResponse({ description: "No User's Todo Lists found" })
//   async getUsersTodoLists(
//     @Request() request: any,
//   ): Promise<GetUsersTodoListsResponseDto[]> {
//     const req: GetUsersTodoListsRequestDto = {
//       userId: request.user.sub,
//     };
//     return this.todoService.getUsersTodoLists(req);
//   }

//   @Get('list/:listId')
//   @ApiOperation({ summary: "Get User's Todo List" })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: 'Successfully retrieved Todo List',
//     type: TodoList,
//   })
//   @ApiNotFoundResponse({ description: 'Todo List not found' })
//   async getUsersTodoList(
//     @Request() request: any,
//     @Param('listId') listId: string,
//   ): Promise<GetUsersTodoListResponseDto> {
//     const userId = request.user.sub;
//     return this.todoService.getUsersTodoList({
//       userId: userId,
//       listId: listId,
//     });
//   }

//   @Post('item')
//   @ApiOperation({ summary: 'Create a new Todo Item within a Todo List' })
//   @ApiResponse({
//     status: HttpStatus.CREATED,
//     description: 'Successfully created Todo Item',
//     type: TodoItem,
//   })
//   @ApiBadRequestResponse({ description: 'Failed to create Todo Item' })
//   @ApiNotFoundResponse({ description: 'Todo List not found' })
//   async createTodoItem(
//     @Request() request: any,
//     @Body() req: CreateTodoItemRequestDto,
//   ): Promise<TodoItemDto> {
//     req.userId = request.user.sub;
//     req.isDone = false;
//     return this.todoService.createTodoItem(req);
//   }

//   @Patch('item')
//   @ApiOperation({ summary: 'Update a Todo Item' })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: 'Successfully updated Todo Item',
//     type: TodoItem,
//   })
//   @ApiBadRequestResponse({ description: 'Failed to update Todo Item' })
//   @ApiNotFoundResponse({ description: 'Todo Item not found' })
//   async updateTodoItem(
//     @Request() request: any,
//     @Body() req: UpdateTodoItemRequestDto,
//   ): Promise<TodoItemDto> {
//     req.userId = request.user.sub;
//     return this.todoService.updateTodoItem(req);
//   }

//   @Patch('list')
//   @ApiOperation({ summary: 'Update a Todo List' })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: 'Successfully updated Todo List',
//     type: TodoList,
//   })
//   @ApiBadRequestResponse({ description: 'Failed to update Todo List' })
//   @ApiNotFoundResponse({ description: 'Todo List not found' })
//   async updateTodoList(
//     @Request() request: any,
//     @Body() req: UpdateTodoListRequestDto,
//   ): Promise<Partial<CreateTodoListResponseDto>> {
//     req.userId = request.user.sub;
//     return this.todoService.updateTodoList(req);
//   }

//   @Delete(':listId')
//   @ApiOperation({ summary: 'Delete a Todo List and its Items' })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: 'Successfully deleted Todo List',
//     type: TodoList,
//   })
//   @ApiBadRequestResponse({ description: 'Failed to delete Todo List' })
//   @ApiNotFoundResponse({ description: 'Todo List not found' })
//   async deleteTodoList(
//     @Request() request: any,
//     @Param('listId') listId: string,
//   ): Promise<DeleteTodoListResponseDto> {
//     return this.todoService.deleteTodoList({
//       listId,
//       userId: request.user.sub,
//     });
//   }
}
