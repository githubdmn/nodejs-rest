import {
  CreateBlogInternalRequestDto,
  CreateBlogRequestDto,
  CreateBlogResponseDto,
  DeleteBlogResponseDto,
  GetBlogDto,
  UpdateBlogRequestDto,
} from '@/dto';
import { BlogGuard } from '@/guard';
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Request,
  Inject,
  NotFoundException,
  BadRequestException,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { IBlogService } from './blog.interface';
import { BLOG_SERVICE } from '@/constants/instances.constants';
import { BlogEntity } from '@/entities';
import { UpdateBlogResponseDto } from '@/dto/updateBlog.response.dto';
import { JwtInterceptor, SerializeExclude } from '@/interceptor';

@ApiTags('Blog')
@UseGuards(BlogGuard)
@UseInterceptors(JwtInterceptor)
@Controller('blog')
export class BlogController {
  constructor(
    @Inject(BLOG_SERVICE) private readonly blogService: IBlogService,
  ) {}

  @Post()
  @SerializeExclude(CreateBlogResponseDto)
  @ApiCreatedResponse({
    description: 'Blog post created successfully',
    type: BlogEntity,
  })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  async createBlog(
    @Request() request: any,
    @Body() createBlogDto: CreateBlogRequestDto,
  ): Promise<CreateBlogResponseDto> {
    try {
      const createBlog: CreateBlogInternalRequestDto = {
        userId: request.jwtPayload.sub,
        ...createBlogDto,
      };
      return await this.blogService.createBlog(createBlog);
    } catch (error: any) {
      throw new BadRequestException(`Failed to create blog: ${error.message}`);
    }
  }

  // @Get('my-blogs')
  // @ApiOperation({ summary: 'Get all blogs by current user ID' })
  // @ApiOkResponse({
  //   description: 'Successfully retrieved blogs by current user',
  //   type: [GetBlogDto],
  // })
  // @ApiBadRequestResponse({ description: 'Failed to retrieve blogs' })
  // async getAllBlogsByCurrentUserId(@Request() req: any): Promise<GetBlogDto[]> {
  //   try {
  //     return await this.blogService.getAllBlogsByUserId(req.jwtPayload.sub);
  //   } catch (error: any) {
  //     throw new BadRequestException(
  //       `Failed to retrieve blogs: ${error.message}`,
  //     );
  //   }
  // }

  // @Get('user/:userId')
  // @ApiOperation({ summary: 'Get all blogs by user ID' })
  // @ApiOkResponse({
  //   description: 'Successfully retrieved blogs by user',
  //   type: [GetBlogDto],
  // })
  // @ApiBadRequestResponse({ description: 'Failed to retrieve blogs' })
  // async getAllBlogsByUserId(
  //   @Param('userId') userId: string,
  // ): Promise<GetBlogDto[]> {
  //   try {
  //     if (userId === ':userId')
  //       throw new BadRequestException('UserId cannot be an empty string');
  //     return await this.blogService.getAllBlogsByUserId(userId);
  //   } catch (error: any) {
  //     throw new BadRequestException(
  //       `Failed to retrieve blogs: ${error.message}`,
  //     );
  //   }
  // }

  @Get('my-blogs')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiOperation({ summary: 'Get all blogs by current user ID' })
  @ApiOkResponse({
    description: 'Successfully retrieved blogs by current user',
    type: [GetBlogDto],
  })
  @ApiBadRequestResponse({ description: 'Failed to retrieve blogs' })
  async getAllBlogsByCurrentUserId(
    @Request() req: any,
    @Query('pageNumber') pageNumber = 1,
    @Query('numberOfItems') numberOfItems = 0,
  ): Promise<GetBlogDto[]> {
    try {
      return await this.blogService.getAllBlogsByUserIdPaginable(
        req.jwtPayload.sub,
        pageNumber,
        numberOfItems,
      );
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to retrieve blogs: ${error.message}`,
      );
    }
  }

  @Get('user/:userId')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiOperation({ summary: 'Get all blogs by user ID' })
  @ApiOkResponse({
    description: 'Successfully retrieved blogs by user',
    type: [GetBlogDto],
  })
  @ApiBadRequestResponse({ description: 'Failed to retrieve blogs' })
  async getAllBlogsByUserId(
    @Param('userId') userId: string,
    @Query('pageNumber') pageNumber = 1,
    @Query('numberOfItems') numberOfItems = 0,
  ): Promise<GetBlogDto[]> {
    try {
      if (userId === ':userId')
        throw new BadRequestException('UserId cannot be an empty string');
      return await this.blogService.getAllBlogsByUserIdPaginable(
        userId,
        pageNumber,
        numberOfItems,
      );
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to retrieve blogs: ${error.message}`,
      );
    }
  }

  @Get()
  @ApiOkResponse({ description: 'List of all blog posts', type: [GetBlogDto] })
  async getAllBlogs(): Promise<GetBlogDto[]> {
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
    type: GetBlogDto,
  })
  @ApiNotFoundResponse({ description: 'Blog post not found' })
  async getBlogById(@Param('id') id: string): Promise<GetBlogDto | null> {
    try {
      const blog = await this.blogService.getBlogById(id);
      if (!blog)
        throw new NotFoundException(`Blog post with ID ${id} not found`);
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
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogRequestDto,
  ): Promise<UpdateBlogResponseDto | null> {
    try {
      const updatedBlog = await this.blogService.updateBlog(
        req.jwtPayload.sub,
        id,
        updateBlogDto,
      );
      if (!updatedBlog)
        throw new NotFoundException(`Blog post with ID ${id} not found`);
      return updatedBlog;
    } catch (error: any) {
      throw new BadRequestException(`Failed to update blog: ${error.message}`);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Blog post deleted successfully' })
  @ApiNotFoundResponse({ description: 'Blog post not found' })
  async deleteBlog(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<DeleteBlogResponseDto> {
    try {
      return await this.blogService.deleteBlog(req.jwtPayload.sub, id);
    } catch (error: any) {
      throw new BadRequestException(`Failed to delete blog: ${error.message}`);
    }
  }
}
