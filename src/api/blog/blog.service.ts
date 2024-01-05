import { env } from '@/conf';
import { MONGODB_BLOG, POSTGRES_BLOG } from '@/constants/instances.constants';
import { IBlogDatabase } from '@/database/database.inteface';
import {
  CreateBlogRequestDto,
  DeleteBlogResponseDto,
  UpdateBlogRequestDto,
} from '@/dto';
import { BlogEntity } from '@/entities';
import { Inject, Injectable } from '@nestjs/common';
import { IBlogService } from './blog.interface';
import { UpdateBlogResponseDto } from '@/dto/updateBlog.response.dto';

const DB_BLOG = POSTGRES_BLOG; // env.dbUse === 'postgres' ? POSTGRES_BLOG : MONGODB_BLOG;

@Injectable()
export class BlogService implements IBlogService {
  constructor(@Inject(DB_BLOG) private blogDB: IBlogDatabase) {}

  async createBlog(createBlog: CreateBlogRequestDto): Promise<BlogEntity> {
    return await this.blogDB.createBlog(createBlog);
  }

  async getAllBlogs(): Promise<BlogEntity[]> {
    return await this.blogDB.getAllBlogs();
  }

  async getBlogById(blogId: string): Promise<BlogEntity | null> {
    return await this.blogDB.getBlogById(blogId);
  }
  async updateBlog(
    blogId: string,
    updateBlog: UpdateBlogRequestDto,
  ): Promise<UpdateBlogResponseDto | null> {
    return await this.blogDB.updateBlog(blogId, updateBlog);
  }

  async deleteBlog(blogId: string): Promise<DeleteBlogResponseDto> {
    return await this.blogDB.deleteBlog(blogId);
  }
}
