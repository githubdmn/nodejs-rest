import {
  CreateBlogInternalRequestDto,
  CreateBlogRequestDto,
  CreateBlogResponseDto,
  DeleteBlogResponseDto,
  GetBlogDto,
  UpdateBlogRequestDto,
} from '@/dto';
import { UpdateBlogResponseDto } from '@/dto/updateBlog.response.dto';

export interface IBlogService {
  createBlog(
    createBlog: CreateBlogInternalRequestDto,
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
    updateBlog: UpdateBlogRequestDto,
  ): Promise<UpdateBlogResponseDto | null>;
  deleteBlog(userId: string, blogId: string): Promise<DeleteBlogResponseDto>;
}
