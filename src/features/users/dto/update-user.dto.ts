import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Role } from '../enum/role.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  image: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional({ enum: Role })
  role: Role;
}
