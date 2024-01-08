import { ApiProperty } from '@nestjs/swagger';

export class GetBlogDto {
  @ApiProperty({ description: 'Unique identifier for the blog' })
  blogId: string;

  @ApiProperty({ description: 'Title of the blog' })
  title: string;

  @ApiProperty({ description: 'Content of the blog post' })
  text: string;

  @ApiProperty({
    description: 'User information associated with the blog',
  })
  user?: {
    userId: string;

    email: string;
  };
}
