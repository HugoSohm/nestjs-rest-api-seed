import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { Role } from './enum/role.enum';
import { Roles } from '../../core/decorators/roles.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  /**
   *
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get users
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Public)
  @ApiOperation({ description: 'Get users' })
  @Get()
  getUsers(): Promise<UsersEntity[]> {
    return this.usersService.findUsers();
  }

  /**
   * Get user by id
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Public)
  @ApiOperation({ description: 'Get user by id' })
  @Get(':id')
  getUserById(@Param('id') id: number): Promise<UsersEntity> {
    return this.usersService.findById(id);
  }

  /**
   * Update a user
   */
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update a user' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @Put('update')
  updateUserById(@UploadedFile() image, @Body() user: UpdateUserDto) {
    image ? (user.image = image.path) : null;

    return this.usersService.updateUser(user);
  }

  /**
   * Update a user password
   */
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update a user password' })
  @Roles(Role.Admin)
  @Put('update-password')
  updateUserPasswordById(@Body() user: UpdateUserPasswordDto) {
    return this.usersService.updateUserPassword(user);
  }

  /**
   * Delete a user
   * @param id
   */
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete a user' })
  @Roles(Role.Admin)
  @Delete('delete/:id')
  deleteCategory(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  /**
   * Send reset password
   * @param email
   */
  @Roles(Role.Public)
  @ApiOperation({ description: 'Send reset password' })
  @Roles(Role.Admin)
  @Post('send-reset/:email')
  sendReset(@Param('email') email: string) {
    return this.usersService.sendReset(email);
  }

  /**
   * Reset a password
   * @param user
   */
  @Roles(Role.Admin)
  @ApiExcludeEndpoint()
  @ApiOperation({ description: 'Reset a password' })
  @Put('reset-password')
  resetPassword(@Body() user: ResetPasswordDto) {
    return this.usersService.resetPassword(user);
  }
}
