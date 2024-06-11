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
      email: userRequest.email,
      password: userRequest.password,
      name: userRequest.name,
    };

    const userExists = await this.authService.userExists(admin.email);

    if (userExists) {
      throw new UserExistsException(`Admin with the email ${admin.email}`);
    }

    const registeredAdmin = await this.authService.registerAdmin(admin);

    return {
      adminId: registeredAdmin.adminId,
      email: registeredAdmin.email,
      name: registeredAdmin.name,
      createdAt: registeredAdmin.createdAt,
    } as CreateAdminResponseDto;
  }
}
