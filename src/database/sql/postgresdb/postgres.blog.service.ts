import { IBlogDatabase } from '@/database/database.inteface';
import {
  CreateBlogRequestDto,
  DeleteBlogResponseDto,
  UpdateBlogRequestDto,
} from '@/dto';
import { UpdateBlogResponseDto } from '@/dto/updateBlog.response.dto';
import { BlogEntity, UserEntity } from '@/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PostgresBlogService implements IBlogDatabase {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createBlog(createBlogDto: CreateBlogRequestDto): Promise<BlogEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { userId: createBlogDto.userId },
      });
      if (!user)
        throw new Error(`User with userId ${createBlogDto.userId} not found`);
      const newBlog = this.blogRepository.create({
        title: createBlogDto.title,
        text: createBlogDto.text,
        user,
      });
      return await this.blogRepository.save(newBlog);
    } catch (error: any) {
      throw new Error(`Error creating blog post: ${error.message}`);
    }
  }

  private getBlogQuery() {
    // To exclude specific fields (blog.id and user.id)
    return this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .select([
        'blog.blogId',
        'blog.title',
        'blog.text',
        'user.userId',
        'user.email',
      ]);
  }

  async getAllBlogs(): Promise<BlogEntity[]> {
    try {
      // return await this.blogRepository.find();
      return await this.getBlogQuery().getMany();
    } catch (error: any) {
      throw new Error(`Error retrieving all blog posts: ${error.message}`);
    }
  }

  async getBlogById(blogId: string): Promise<BlogEntity | null> {
    try {
      return await this.getBlogQuery()
        .where('blog.blogId = :blogId', { blogId })
        .getOne();
    } catch (error: any) {
      throw new Error(`Error retrieving blog post by ID: ${error.message}`);
    }
  }

  async getAllBlogsByUserId(userId: string): Promise<BlogEntity[]> {
    try {
      return await this.blogRepository.find({
        where: { user: { userId: userId } },
      });
    } catch (error: any) {
      throw new Error(`Error retrieving blogs by userId: ${error.message}`);
    }
  }

  async updateBlog(
    blogId: string,
    updateBlogDto: UpdateBlogRequestDto,
  ): Promise<UpdateBlogResponseDto | null> {
    try {
      const existingBlog = await this.blogRepository.findOneBy({
        blogId: blogId,
      });
      if (!existingBlog) {
        throw new NotFoundException(`Blog post with ID ${blogId} not found`);
      }
      this.blogRepository.merge(existingBlog, updateBlogDto);
      const saved = await this.blogRepository.save(existingBlog);
      return {
        title: saved.title,
        text: saved.text,
        userId: saved.user.userId,
      } as UpdateBlogResponseDto;
    } catch (error: any) {
      throw new Error(`Error updating blog post: ${error.message}`);
    }
  }

  async deleteBlog(blogId: string): Promise<DeleteBlogResponseDto> {
    try {
      const [blog] = await this.blogRepository.find({ where: { blogId } });
      if (blog == null)
        throw new NotFoundException(`Blog post with ID ${blogId} not found`);
      const result = await this.blogRepository.remove(blog);
      return {
        blogId: result.blogId,
        title: result.title,
        text: result.text,
      } as DeleteBlogResponseDto;
    } catch (error: any) {
      throw new Error(`Error deleting blog post: ${error.message}`);
    }
  }

  async deleteAllBlogsByUserId(
    userId: string,
  ): Promise<DeleteBlogResponseDto[]> {
    try {
      const blogsToDelete = await this.blogRepository.find({
        where: { user: { userId: userId } },
      });
      if (!blogsToDelete || blogsToDelete.length === 0) {
        throw new NotFoundException(
          `No blogs found for user with ID ${userId}`,
        );
      }
      const deleted = await this.blogRepository.remove(blogsToDelete);
      return deleted.map((blog) => ({
        blogId: blog.blogId,
        title: blog.title,
        text: blog.text,
      })) as DeleteBlogResponseDto[];
    } catch (error: any) {
      throw new Error(`Error deleting blogs by userId: ${error.message}`);
    }
  }
}
