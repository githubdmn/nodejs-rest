import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoList, TodoItem, UserEntity } from '@/entities';
import { ITodoDatabase } from '@/database/database.inteface';
import {
  CreateTodoItemRequestDto,
  CreateTodoListRequestDto,
  CreateTodoListResponseDto,
  DeleteTodoListRequestDto,
  DeleteTodoListResponseDto,
  GetUsersTodoListRequestDto,
  GetUsersTodoListResponseDto,
  GetUsersTodoListsRequestDto,
  GetUsersTodoListsResponseDto,
  GetUsersTodoListsResponseWithItemsDto,
  TodoItemDto,
  UpdateTodoItemRequestDto,
  UpdateTodoListRequestDto,
  UpdateTodoListResponseDto,
} from '@/dto';
import {
  mapCreateTodoListResponse,
  mapGetUsersListResponse,
  mapGetUsersListItemsResponse,
  mapGetUserListResponse,
  mapDeleteTodoListResponse,
  mapItem,
} from './mappers';

@Injectable()
export default class PostgresTodoService implements ITodoDatabase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  private async handleException<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Todo not found: ${error.message}`);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(`Unauthorized: ${error.message}`);
      }
      throw new Error(`Failed to process request: ${error.message}`);
    }
  }

  async createTodoList({
    userId,
    ...data
  }: CreateTodoListRequestDto): Promise<Partial<CreateTodoListResponseDto>> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { userId },
      });
      const todoList = this.todoListRepository.create({
        ...data,
        user: user, // Set the user relationship
      });
      const created = await this.todoListRepository.save(todoList);
      return mapCreateTodoListResponse(created);
    } catch (error: any) {
      throw new Error(`Failed to create todo list: ${error.message}`);
    }
  }

  async getUsersTodoLists(
    req: GetUsersTodoListsRequestDto,
  ): Promise<GetUsersTodoListsResponseDto[]> {
    try {
      const { userId } = req;
      const userTodoLists = await this.todoListRepository.find({
        where: { user: { userId } },
      });
      return mapGetUsersListResponse(userTodoLists);
    } catch (error: any) {
      throw new Error(`Failed to retrieve todo lists: ${error.message}`);
    }
  }

  async getUsersTodoListsWithItems(
    req: GetUsersTodoListsRequestDto,
  ): Promise<GetUsersTodoListsResponseWithItemsDto[]> {
    try {
      const { userId } = req;
      const userTodoLists = await this.todoListRepository.find({
        where: { user: { userId } },
        relations: ['items'],
      });
      return mapGetUsersListItemsResponse(userTodoLists);
    } catch (error: any) {
      throw new Error(
        `Failed to retrieve todo lists with items: ${error.message}`,
      );
    }
  }

  async getUsersTodoList(
    req: GetUsersTodoListRequestDto,
  ): Promise<GetUsersTodoListResponseDto> {
    try {
      const { userId, listId } = req;
      const list = await this.todoListRepository.findOne({
        where: { user: { userId }, listId: listId },
        relations: ['items'],
      });
      if (!list)
        throw new NotFoundException(
          `Todo list with ID ${listId} not found for user ${userId}.`,
        );
      return mapGetUserListResponse(list);
    } catch (error: any) {
      throw new Error(`Failed to retrieve todo lists: ${error.message}`);
    }
  }

  async updateTodoList(
    req: UpdateTodoListRequestDto,
  ): Promise<Partial<CreateTodoListResponseDto>> {
    try {
      const { userId, listId, ...data } = req;
      const todoList = await this.todoListRepository.findOneOrFail({
        where: { listId, user: { userId } },
      });
      console.log(todoList);

      this.todoListRepository.merge(todoList, { ...data });
      const updatedTodoList = await this.todoListRepository.save(todoList);
      return mapCreateTodoListResponse(updatedTodoList);
    } catch (error: any) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(
          `Todo list with ID ${req.listId} not found.`,
        );
      else if (error instanceof UnauthorizedException)
        throw new UnauthorizedException(
          'You are not authorized to update this todo list.',
        );
      throw new Error(`Failed to update todo list: ${error.message}`);
    }
  }

  async deleteTodoList(
    req: DeleteTodoListRequestDto,
  ): Promise<DeleteTodoListResponseDto> {
    try {
      const { userId, listId } = req;
      const todoList = await this.todoListRepository.findOneOrFail({
        where: { listId, user: { userId } },
        relations: ['items'],
      });
      const deletedTodoList = await this.todoListRepository.remove(todoList);
      return mapDeleteTodoListResponse(deletedTodoList);
    } catch (error: any) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(
          `Todo list with ID ${req.listId} not found.`,
        );
      else if (error instanceof UnauthorizedException)
        throw new UnauthorizedException(
          'You are not authorized to delete this todo list.',
        );
      throw new Error(`Failed to delete todo list: ${error.message}`);
    }
  }

  async createTodoItem(req: CreateTodoItemRequestDto): Promise<TodoItemDto> {
    try {
      const { userId, listId, ...data } = req;
      const todoList = await this.todoListRepository.findOneOrFail({
        where: { listId, user: { userId } },
      });
      const todoItem = this.todoItemRepository.create({
        ...data,
        todoList,
      });
      const item = await this.todoItemRepository.save(todoItem);
      return mapItem(item);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Todo list with ID ${req.listId} not found.`,
        );
      }
      throw new Error(`Failed to create todo item: ${error.message}`);
    }
  }

  async updateTodoItem(req: UpdateTodoItemRequestDto): Promise<TodoItemDto> {
    try {
      const { userId, listId, itemId, ...data } = req;
      const todoItem = await this.todoItemRepository.findOneOrFail({
        where: { itemId },
        relations: ['todoList', 'todoList.user'],
      });
      if (todoItem.todoList.user.userId !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to update this item.',
        );
      }
      this.todoItemRepository.merge(todoItem, data);
      const item = await this.todoItemRepository.save(todoItem);
      return mapItem(item);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Todo item with ID ${req.itemId} not found.`,
        );
      }
      throw new Error(`Failed to update todo item: ${error.message}`);
    }
  }
}
