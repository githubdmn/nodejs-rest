import {
  AuthResponseDto,
  CreateBlogInternalRequestDto,
  CreateBlogResponseDto,
  CreateUserRequestDto,
  CreateUserResponseDto,
  DeleteBlogResponseDto,
  GetBlogDto,
  SaveLoginRequestDto,
  SaveLoginResponseDto,
  UpdateBlogRequestDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  UserDto,
} from '@/dto';
import { UpdateBlogResponseDto } from '@/dto/updateBlog.response.dto';

export interface IUserDatabase {
  save(user: CreateUserRequestDto): Promise<CreateUserResponseDto>;
  findUserByUserId(userId: string): Promise<UserDto>;
  findUserByEmail(email: string): Promise<UserDto>;
  updateUser(
    userId: string,
    newUser: Partial<UpdateUserRequestDto>,
  ): Promise<UpdateUserResponseDto>;
}

export interface IBlogDatabase {
  createBlog(
    createBlogDto: CreateBlogInternalRequestDto,
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
    updateBlogDto: UpdateBlogRequestDto,
  ): Promise<UpdateBlogResponseDto | null>;
  deleteBlog(userId: string, blogId: string): Promise<DeleteBlogResponseDto>;
  deleteAllBlogsByUserId(userId: string): Promise<DeleteBlogResponseDto[]>;
}

export interface IAuth {
  saveLogin(login: SaveLoginRequestDto): Promise<SaveLoginResponseDto>;
  logout(userId: string): Promise<boolean>;
  findAuthByRefreshToken(
    refreshToken: string,
  ): Promise<Partial<AuthResponseDto>>;
}
