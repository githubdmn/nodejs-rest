import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthGuard } from '@nestjs/passport';
import { CreateAdminRequestDto, CreateAdminResponseDto } from './dto';
import { AdminRegisterRequestDto, UserRegisterRequestDto } from '@/dto';

@Controller('auth/admin')
export class AuthAdminController extends AuthController {
  //@UseGuards(AuthGuard('local'))
  @Post()
  async register(
    @Body() userRequest: CreateAdminRequestDto,
  ): Promise<CreateAdminResponseDto> {
    const admin: AdminRegisterRequestDto = {
      email: userRequest.email,
      password: userRequest.password,
      name: userRequest.name,
    };

    const registeredAdmin = await this.authService.registerAdmin(admin);

    return {
      adminId: registeredAdmin.adminId,
      email: registeredAdmin.email,
      name: registeredAdmin.name,
      createdAt: registeredAdmin.createdAt,
    } as CreateAdminResponseDto;
  }
}
