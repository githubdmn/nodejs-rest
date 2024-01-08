import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { DatabaseModule } from '@/database/database.module';
import { BLOG_SERVICE } from '@/utils/constants';

const Service = [
  {
    provide: BLOG_SERVICE,
    useClass: BlogService,
  },
];

@Module({
  providers: [...Service],
  controllers: [BlogController],
  imports: [DatabaseModule],
})
export class BlogModule {}
