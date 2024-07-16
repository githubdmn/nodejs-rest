import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateAdminRequestDto, CreateAdminResponseDto } from './dto';
import { AdminRegisterRequestDto } from '@/dto';
import { GeneralFilter, UserExistsException } from '@/exceptions';

@Controller('auth/admin')
export class AuthAdminController extends AuthController {
  @UseFilters(GeneralFilter)
  @Post()
  async register(
    @Body() userRequest: CreateAdminRequestDto,
  ): Promise<CreateAdminResponseDto> {
    const admin: AdminRegisterRequestDto = {
      name: userRequest.name,
      email: userRequest.email,
      password: userRequest.password,
    };

    const registeredAdmin = await this.userDB.register(admin);

    return {
      adminId: registeredAdmin.adminId,
      email: registeredAdmin.email,
      name: registeredAdmin.name,
      createdAt: registeredAdmin.createdAt,
    } as CreateAdminResponseDto;
  }
}
