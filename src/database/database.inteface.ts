import {
  CreateBlogRequestDto,
  CreateUserRequest,
  DeleteBlogResponseDto,
  UpdateBlogRequestDto,
} from '@/dto';
import { UpdateBlogResponseDto } from '@/dto/updateBlog.response.dto';
import { BlogEntity, UserEntity } from '@/entities';

export interface IUserDatabase {
  save(user: CreateUserRequest): Promise<UserEntity>;
  findUserByUserId(userId: string): Promise<UserEntity | null>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
}

export interface IBlogDatabase {
  createBlog(createBlogDto: CreateBlogRequestDto): Promise<BlogEntity>;
  getAllBlogs(): Promise<BlogEntity[]>;
  getBlogById(blogId: string): Promise<BlogEntity | null>;
  getAllBlogsByUserId(userId: string): Promise<BlogEntity[]>;
  updateBlog(
    blogId: string,
    updateBlogDto: UpdateBlogRequestDto,
  ): Promise<UpdateBlogResponseDto | null>;
  deleteBlog(blogId: string): Promise<DeleteBlogResponseDto>;
  deleteAllBlogsByUserId(userId: string): Promise<DeleteBlogResponseDto[]>;
}
