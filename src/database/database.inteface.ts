import {
  CreateBlogRequestDto,
  CreateUserRequest,
  UpdateBlogRequestDto,
} from '@/dto';
import { BlogEntity, UserEntity } from '@/entities';

export interface IUserDatabase {
  save(user: CreateUserRequest): Promise<UserEntity>;
  findUserByUserId(userId: string): Promise<UserEntity | null>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
}

export interface IBlogDatabase {
  createBlog(createBlogDto: CreateBlogRequestDto): Promise<BlogEntity>;
  getAllBlogsPagination(page: number, pageSize: number): Promise<BlogEntity[]>;
  getAllBlogs(): Promise<BlogEntity[]>;
  getBlogById(blogId: string): Promise<BlogEntity | null>;
  getAllBlogsByUserId(userId: string): Promise<BlogEntity[]>;
  getAllBlogsByUserIdPagination(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<BlogEntity[]>;
  updateBlog(
    blogId: string,
    updateBlogDto: UpdateBlogRequestDto,
  ): Promise<BlogEntity | null>;
  deleteBlog(blogId: string): Promise<void>;
  deleteAllBlogsByUserId(userId: string): Promise<void>;
}
