import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateAdminRequestDto, CreateAdminResponseDto } from './dto';
import { AdminRegisterRequestDto } from '@/dto';
import {
  AllExceptionsFilter,
  GeneralFilter,
  UserExistsException,
} from '@/exceptions';
import { CustomAuthAdminService } from './custom/service';
import { CUSTOM_AUTH_ADMIN_SERVICE } from './custom/constants';

@Controller('auth/admin')
export class AuthAdminController {
  constructor(
    @Inject(CUSTOM_AUTH_ADMIN_SERVICE)
    private adminService: CustomAuthAdminService,
    private logger: Logger,
  ) {}

  @UseFilters(AllExceptionsFilter)
  @Post()
  async register(@Body() adminRequestBody: any): Promise<any> {
    const registeredAdmin =
      await this.adminService.registerAdmin(adminRequestBody);
    this.logger.log(
      `Admin with email ${registeredAdmin.email} registered successfully`,
    );

    return registeredAdmin;
  }

  //   @UseFilters(GeneralFilter)
  //   @Post()
  //   async register(@Body() userRequest: CreateAdminRequestDto): Promise<any> {
  //     const admin: AdminRegisterRequestDto = {
  //       email: userRequest.email,
  //       password: userRequest.password,
  //       name: userRequest.name,
  //     };
  //     const userExists = await this.authService.userExists(admin.email);
  //     if (userExists) {
  //       throw new UserExistsException(`Admin with the email ${admin.email}`);
  //     }
  //   const registeredAdmin = await this.authService.registerAdmin(admin);
  //   return {
  //     adminId: registeredAdmin.adminId,
  //     email: registeredAdmin.email,
  //     name: registeredAdmin.name,
  //     createdAt: registeredAdmin.createdAt,
  //   } as CreateAdminResponseDto;
  //   }
}
