import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostgresBlogService } from '@/database/sql/postgresdb';
import { BlogEntity, UserEntity } from '@/entities';
import { CreateBlogRequestDto, UpdateBlogRequestDto } from '@/dto';
import { NotFoundException } from '@nestjs/common';
import Blog from '@/entities/blog.entity';

describe('PostgresBlogService', () => {
  let blogService: PostgresBlogService;
  let blogRepository: Repository<BlogEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresBlogService,
        {
          provide: getRepositoryToken(BlogEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    blogService = module.get<PostgresBlogService>(PostgresBlogService);
    blogRepository = module.get<Repository<BlogEntity>>(
      getRepositoryToken(BlogEntity),
    );
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });

  describe('createBlog', () => {
    it('should create a blog successfully', async () => {
      const createBlogDto: CreateBlogRequestDto = {
        title: 'Test Blog',
        text: 'This is a test blog post.',
        userId: '38198',
      };

      const mockUser = new UserEntity();
      mockUser.userId = createBlogDto.userId;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      const mockSavedBlog = new BlogEntity();
      jest.spyOn(blogRepository, 'create').mockReturnValue(mockSavedBlog);
      jest.spyOn(blogRepository, 'save').mockResolvedValue(mockSavedBlog);

      const savedBlog = await blogService.createBlog(createBlogDto);

      expect(savedBlog).toEqual(mockSavedBlog);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: {
          userId: createBlogDto.userId,
        },
      });
      expect(blogRepository.create).toHaveBeenCalledWith({
        title: createBlogDto.title,
        text: createBlogDto.text,
        user: mockUser,
      });
      expect(blogRepository.save).toHaveBeenCalledWith(mockSavedBlog);
    });

    it('should fail to create a blog when saving a user fails', async () => {
      const createBlogDto: CreateBlogRequestDto = {
        title: 'Test Blog',
        text: 'This is a test blog post.',
        userId: '22817',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(blogService.createBlog(createBlogDto)).rejects.toThrowError(
        `User with userId ${createBlogDto.userId} not found`,
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: {
          userId: createBlogDto.userId,
        },
      });
    });
  });
});
