import {
  CreateBlogRequestDto,
  DeleteBlogResponseDto,
  UpdateBlogRequestDto,
} from '@/dto';
import { UpdateBlogResponseDto } from '@/dto/updateBlog.response.dto';
import { BlogEntity } from '@/entities';

export interface IBlogService {
  createBlog(createBlog: CreateBlogRequestDto): Promise<BlogEntity>;
  getAllBlogs(): Promise<BlogEntity[]>;
  getBlogById(blogId: string): Promise<BlogEntity | null>;
  updateBlog(
    blogId: string,
    updateBlog: UpdateBlogRequestDto,
  ): Promise<UpdateBlogResponseDto | null>;
  deleteBlog(blogId: string): Promise<DeleteBlogResponseDto>;
}
