import { DeleteBlogResponseDto } from '@/dto';
import { BlogEntity } from '@/entities';

export default (blogs: BlogEntity[]): DeleteBlogResponseDto[] =>
  blogs.map((blog) => ({
    blogId: blog.blogId,
    title: blog.title,
    text: blog.text,
  }));
