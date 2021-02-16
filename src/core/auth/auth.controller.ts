import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { CryptoUtils } from '../utils/CryptoUtils';
import { UsersService } from '../../features/users/users.service';
import { CreateUserDto } from '../../features/users/dto/create-user.dto';
import { Role } from '../../features/users/enum/role.enum';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  /**
   *
   * @param authService
   * @param usersService
   */
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Register a user
   * @param image
   * @param user
   */
  @ApiBearerAuth()
  @ApiOperation({ description: 'Register a user' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @Roles(Role.Public)
  @Post('register')
  public async register(@UploadedFile() image, @Body() user: CreateUserDto) {
    const isExisting = await this.usersService.findByEmail(user.email);

    if (isExisting)
      throw new HttpException('Email already used', HttpStatus.CONFLICT);

    image ? (user.image = image.path) : null;
    await this.usersService.register(user);
  }

  /**
   * Login a user
   * @param res
   * @param loginDto
   */
  @ApiOperation({ description: 'Login a user' })
  @Roles(Role.Public)
  @Post('login')
  public async login(@Response() res, @Body() loginDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const isGoodPassword = await CryptoUtils.compareHash(
      loginDto.password,
      user.password,
    );
    if (!isGoodPassword)
      throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED);

    const token = this.authService.createToken(user);
    return res.status(HttpStatus.OK).json(token);
  }

  /**
   * Verify a jwt
   * @param token
   */
  @ApiOperation({ description: 'Verify a jwt' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Public)
  @Get('verify/:token')
  public async verifyJwt(@Param('token') token: string) {
    return this.authService.validateUserToken(token);
  }
}
