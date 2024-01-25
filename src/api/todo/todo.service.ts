import { Inject, Injectable } from '@nestjs/common';
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
} from '@/dto';
import { ITodoDatabase } from '@/database/database.inteface';
import { POSTGRES_TODO } from '@/utils/constants';
import { ITodoService } from './todo.interface';

@Injectable()
export class TodoService implements ITodoService {
  constructor(@Inject(POSTGRES_TODO) private readonly tododb: ITodoDatabase) {}

  async createTodoList(
    req: CreateTodoListRequestDto,
  ): Promise<Partial<CreateTodoListResponseDto>> {
    try {
      return await this.tododb.createTodoList(req);
    } catch (error: any) {
      throw new Error(`Failed to create todo list: ${error.message}`);
    }
  }

  async getUsersTodoLists(
    req: GetUsersTodoListsRequestDto,
  ): Promise<GetUsersTodoListsResponseDto[]> {
    try {
      return await this.tododb.getUsersTodoLists(req);
    } catch (error: any) {
      throw new Error(`Failed to retrieve todo lists: ${error.message}`);
    }
  }

  async getUsersTodoList(
    req: GetUsersTodoListRequestDto,
  ): Promise<GetUsersTodoListResponseDto> {
    try {
      return await this.tododb.getUsersTodoList(req);
    } catch (error: any) {
      throw new Error(`Failed to retrieve todo lists: ${error.message}`);
    }
  }

  async updateTodoList(
    req: UpdateTodoListRequestDto,
  ): Promise<Partial<CreateTodoListResponseDto>> {
    try {
      return await this.tododb.updateTodoList(req);
    } catch (error: any) {
      throw new Error(`Failed to delete todo list: ${error.message}`);
    }
  }

  async deleteTodoList(
    req: DeleteTodoListRequestDto,
  ): Promise<DeleteTodoListResponseDto> {
    try {
      return await this.tododb.deleteTodoList(req);
    } catch (error: any) {
      throw new Error(`Failed to delete todo list: ${error.message}`);
    }
  }

  async createTodoItem(req: CreateTodoItemRequestDto): Promise<TodoItemDto> {
    try {
      return await this.tododb.createTodoItem(req);
    } catch (error: any) {
      throw new Error(`Failed to create todo item: ${error.message}`);
    }
  }

  async updateTodoItem(req: CreateTodoItemRequestDto): Promise<TodoItemDto> {
    try {
      return await this.tododb.updateTodoItem(req);
    } catch (error: any) {
      throw new Error(`Failed to update todo item: ${error.message}`);
    }
  }
}
