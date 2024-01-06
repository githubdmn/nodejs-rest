import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogResponseDto {
  @ApiProperty({ description: 'The unique identifier for the blog' })
  blogId: string;

  @ApiProperty({ description: 'The title of the blog post' })
  title: string;

  @ApiProperty({ description: 'The content of the blog post' })
  text: string;

  @ApiProperty({ description: 'The user ID associated with the blog' })
  userId: string;

  @ApiProperty({ description: 'The email of the user who created the blog' })
  userEmail: string;
}
