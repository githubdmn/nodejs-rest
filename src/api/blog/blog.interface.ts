import { CreateBlogRequestDto, UpdateBlogRequestDto } from '@/dto';
import { BlogEntity } from '@/entities';

export interface IBlogService {
  createBlog(createBlog: CreateBlogRequestDto): Promise<BlogEntity>;
  getAllBlogs(): Promise<BlogEntity[]>;
  getBlogById(blogId: string): Promise<BlogEntity | null>;
  updateBlog(
    blogId: string,
    updateBlog: UpdateBlogRequestDto,
  ): Promise<BlogEntity | null>;
  deleteBlog(blogId: string): Promise<void>;
}
