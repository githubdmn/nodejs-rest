import {
  CreateBlogInternalRequestDto,
  CreateBlogRequestDto,
  CreateBlogResponseDto,
  CreateUserRequest,
  DeleteBlogResponseDto,
  GetBlogDto,
  UpdateBlogRequestDto,
} from '@/dto';
import { UpdateBlogResponseDto } from '@/dto/updateBlog.response.dto';
import { UserEntity } from '@/entities';

export interface IUserDatabase {
  save(user: CreateUserRequest): Promise<UserEntity>;
  findUserByUserId(userId: string): Promise<UserEntity | null>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
}

export interface IBlogDatabase {
  createBlog(
    createBlogDto: CreateBlogInternalRequestDto,
  ): Promise<CreateBlogResponseDto>;
  getAllBlogs(): Promise<GetBlogDto[]>;
  getBlogById(blogId: string): Promise<GetBlogDto | null>;
  getAllBlogsByUserId(userId: string): Promise<GetBlogDto[]>;
  getAllBlogsPaginable(
    pageNumber: number,
    numberOfItems: number,
  ): Promise<GetBlogDto[]>;
  getAllBlogsByUserIdPaginable(
    userId: string,
    pageNumber: number,
    numberOfItems: number,
  ): Promise<GetBlogDto[]>;
  updateBlog(
    userId: string,
    blogId: string,
    updateBlogDto: UpdateBlogRequestDto,
  ): Promise<UpdateBlogResponseDto | null>;
  deleteBlog(userId: string, blogId: string): Promise<DeleteBlogResponseDto>;
  deleteAllBlogsByUserId(userId: string): Promise<DeleteBlogResponseDto[]>;
}
