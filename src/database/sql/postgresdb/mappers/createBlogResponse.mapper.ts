import { CreateBlogResponseDto } from '@/dto';
import { BlogEntity } from '@/entities';

export default (createdBlog: BlogEntity): CreateBlogResponseDto => ({
  blogId: createdBlog.blogId,
  title: createdBlog.title,
  text: createdBlog.text,
  userId: createdBlog.user.userId,
  userEmail: createdBlog.user.email,
});
