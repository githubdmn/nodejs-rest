import { CreateBlogRequestDto, UpdateBlogRequestDto } from '@/dto';
import { BlogGuard } from '@/guard/blog.guard';
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { IBlogService } from './blog.interface';
import { BLOG_SERVICE } from '@/constants/instances.constants';
import { BlogEntity } from '@/entities';

@ApiTags('Blog')
@UseGuards(BlogGuard)
@Controller('blog')
export class BlogController {
  constructor(
    @Inject(BLOG_SERVICE) private readonly blogService: IBlogService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Blog post created successfully',
    type: BlogEntity,
  })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  async createBlog(
    @Body() createBlogDto: CreateBlogRequestDto,
  ): Promise<BlogEntity> {
    try {
      return await this.blogService.createBlog(createBlogDto);
    } catch (error: any) {
      throw new BadRequestException(`Failed to create blog: ${error.message}`);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'List of all blog posts', type: [BlogEntity] })
  async getAllBlogs(): Promise<BlogEntity[]> {
    try {
      return await this.blogService.getAllBlogs();
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to retrieve blogs: ${error.message}`,
      );
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Blog post retrieved successfully',
    type: BlogEntity,
  })
  @ApiNotFoundResponse({ description: 'Blog post not found' })
  async getBlogById(@Param('id') id: string): Promise<BlogEntity | null> {
    try {
      const blog = await this.blogService.getBlogById(id);
      if (!blog) {
        throw new NotFoundException(`Blog post with ID ${id} not found`);
      }
      return blog;
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to retrieve blog: ${error.message}`,
      );
    }
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Blog post updated successfully',
    type: BlogEntity,
  })
  @ApiNotFoundResponse({ description: 'Blog post not found' })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogRequestDto,
  ): Promise<BlogEntity | null> {
    try {
      const updatedBlog = await this.blogService.updateBlog(id, updateBlogDto);
      if (!updatedBlog) {
        throw new NotFoundException(`Blog post with ID ${id} not found`);
      }
      return updatedBlog;
    } catch (error: any) {
      throw new BadRequestException(`Failed to update blog: ${error.message}`);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Blog post deleted successfully' })
  @ApiNotFoundResponse({ description: 'Blog post not found' })
  async deleteBlog(@Param('id') id: string): Promise<void> {
    try {
      await this.blogService.deleteBlog(id);
    } catch (error: any) {
      throw new BadRequestException(`Failed to delete blog: ${error.message}`);
    }
  }
}
