import { IBlogDatabase } from '@/database/database.inteface';
import { CreateBlogRequestDto, UpdateBlogRequestDto } from '@/dto';
import { BlogEntity } from '@/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresBlogService implements IBlogDatabase {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
  ) {}

  async createBlog(createBlogDto: CreateBlogRequestDto): Promise<BlogEntity> {
    try {
      const newBlog = this.blogRepository.create(createBlogDto);
      return await this.blogRepository.save(newBlog);
    } catch (error: any) {
      throw new Error(`Error creating blog post: ${error.message}`);
    }
  }

  async getAllBlogs(): Promise<BlogEntity[]> {
    try {
      return await this.blogRepository.find();
    } catch (error: any) {
      throw new Error(`Error retrieving all blog posts: ${error.message}`);
    }
  }

  async getAllBlogsPagination(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<BlogEntity[]> {
    try {
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      return await this.blogRepository.find({
        skip,
        take,
      });
    } catch (error: any) {
      throw new Error(`Error retrieving paginated blogs: ${error.message}`);
    }
  }

  async getBlogById(blogId: string): Promise<BlogEntity | null> {
    try {
      return await this.blogRepository.findOneBy({
        blogId: blogId,
      });
    } catch (error: any) {
      throw new Error(`Error retrieving blog post by ID: ${error.message}`);
    }
  }

  async getAllBlogsByUserId(userId: string): Promise<BlogEntity[]> {
    try {
      return await this.blogRepository.find({ where: { userId } });
    } catch (error: any) {
      throw new Error(`Error retrieving blogs by userId: ${error.message}`);
    }
  }

  async getAllBlogsByUserIdPagination(
    userId: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<BlogEntity[]> {
    try {
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      return await this.blogRepository.find({
        where: { userId },
        skip,
        take,
      });
    } catch (error: any) {
      throw new Error(
        `Error retrieving paginated blogs by userId: ${error.message}`,
      );
    }
  }

  async updateBlog(
    blogId: string,
    updateBlogDto: UpdateBlogRequestDto,
  ): Promise<BlogEntity | null> {
    try {
      const existingBlog = await this.blogRepository.findOneBy({
        blogId: blogId,
      });

      if (!existingBlog) {
        throw new NotFoundException(`Blog post with ID ${blogId} not found`);
      }

      this.blogRepository.merge(existingBlog, updateBlogDto);
      return await this.blogRepository.save(existingBlog);
    } catch (error: any) {
      throw new Error(`Error updating blog post: ${error.message}`);
    }
  }

  async deleteBlog(blogId: string): Promise<void> {
    try {
      const result = await this.blogRepository.delete(blogId);

      if (result.affected === 0) {
        throw new NotFoundException(`Blog post with ID ${blogId} not found`);
      }
    } catch (error: any) {
      throw new Error(`Error deleting blog post: ${error.message}`);
    }
  }

  async deleteAllBlogsByUserId(userId: string): Promise<void> {
    try {
      const blogsToDelete = await this.blogRepository.find({
        where: { userId },
      });

      if (!blogsToDelete || blogsToDelete.length === 0) {
        throw new NotFoundException(
          `No blogs found for user with ID ${userId}`,
        );
      }

      await this.blogRepository.remove(blogsToDelete);
    } catch (error: any) {
      throw new Error(`Error deleting blogs by userId: ${error.message}`);
    }
  }
}
