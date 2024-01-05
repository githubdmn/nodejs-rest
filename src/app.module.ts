import { Module } from '@nestjs/common';
import { TypeORMConfig } from './conf';
import { UserModule } from './api/user/user.module';
import { BlogModule } from './api/blog/blog.module';

@Module({
  imports: [TypeORMConfig, UserModule, BlogModule],
})
export class AppModule {}
