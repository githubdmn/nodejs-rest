import { POSTGRES_BLOG } from '@/utils/constants';
import { IBlogDatabase } from '@/database/database.inteface';
import {
  CreateBlogInternalRequestDto,
  CreateBlogResponseDto,
  DeleteBlogResponseDto,
  GetBlogDto,
  UpdateBlogRequestDto,
} from '@/dto';
import { Inject, Injectable } from '@nestjs/common';
import { IBlogService } from './blog.interface';
import { UpdateBlogResponseDto } from '@/dto/updateBlog.response.dto';

const DB_BLOG = POSTGRES_BLOG; // env.dbUse === 'postgres' ? POSTGRES_BLOG : MONGODB_BLOG;

@Injectable()
export class BlogService implements IBlogService {
  constructor(@Inject(DB_BLOG) private blogDB: IBlogDatabase) {}

  async createBlog(
    createBlog: CreateBlogInternalRequestDto,
  ): Promise<CreateBlogResponseDto> {
    return await this.blogDB.createBlog(createBlog);
  }

  async getAllBlogs(): Promise<GetBlogDto[]> {
    return await this.blogDB.getAllBlogs();
  }

  async getBlogById(blogId: string): Promise<GetBlogDto | null> {
    return await this.blogDB.getBlogById(blogId);
  }

  async getAllBlogsByUserId(userId: string): Promise<GetBlogDto[]> {
    return await this.blogDB.getAllBlogsByUserId(userId);
  }

  async getAllBlogsPaginable(
    pageNumber: number,
    numberOfItems: number,
  ): Promise<GetBlogDto[]> {
    return await this.blogDB.getAllBlogsPaginable(pageNumber, numberOfItems);
  }

  async getAllBlogsByUserIdPaginable(
    userId: string,
    pageNumber: number,
    numberOfItems: number,
  ): Promise<GetBlogDto[]> {
    return await this.blogDB.getAllBlogsByUserIdPaginable(
      userId,
      pageNumber,
      numberOfItems,
    );
  }

  async updateBlog(
    userId: string,
    blogId: string,
    updateBlog: UpdateBlogRequestDto,
  ): Promise<UpdateBlogResponseDto | null> {
    return await this.blogDB.updateBlog(userId, blogId, updateBlog);
  }

  async deleteBlog(
    userId: string,
    blogId: string,
  ): Promise<DeleteBlogResponseDto> {
    return await this.blogDB.deleteBlog(userId, blogId);
  }
}
