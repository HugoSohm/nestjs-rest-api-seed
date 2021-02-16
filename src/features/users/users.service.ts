import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { CryptoUtils } from '../../core/utils/CryptoUtils';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Mailer } from '../../core/mail/mailer';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailer: Mailer,
  ) {}

  public async findUsers(): Promise<UsersEntity[]> {
    return this.usersRepository.findUsers();
  }

  public async findByEmail(email: string): Promise<UsersEntity> {
    return this.usersRepository.findUserByEmail(email);
  }

  public async findById(id: number): Promise<UsersEntity> {
    return this.usersRepository.findUserById(id);
  }

  public async updateUser(updatedUser: UpdateUserDto): Promise<UpdateResult> {
    const user = await this.usersRepository.findUserById(updatedUser.id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.usersRepository.update(updatedUser.id, {
      ...updatedUser,
    });
  }

  public async updateUserPassword(
    updatedUserPassword: UpdateUserPasswordDto,
  ): Promise<UpdateResult> {
    const user = await this.usersRepository.findUserById(
      updatedUserPassword.id,
    );
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isGoodPassword = await CryptoUtils.compareHash(
      updatedUserPassword.oldPassword,
      user.password,
    );
    if (!isGoodPassword)
      throw new HttpException("Password doesn't match", HttpStatus.CONFLICT);

    const newPassword = await CryptoUtils.getHash(
      updatedUserPassword.newPassword,
    );
    return this.usersRepository.update(updatedUserPassword.id, {
      password: newPassword,
    });
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  public async register(userDto: CreateUserDto): Promise<UsersEntity> {
    // eslint-disable-next-line no-param-reassign
    userDto.password = await CryptoUtils.getHash(userDto.password);
    return this.usersRepository.save({ ...userDto });
  }

  async sendReset(email: string): Promise<void | HttpStatus> {
    const userByMail: UsersEntity = await this.findByEmail(email);

    if (!email || !userByMail) {
      throw new HttpException(
        'No user found for this email',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.mailer.sendMail(userByMail);
  }

  async resetPassword(user: ResetPasswordDto): Promise<UpdateResult> {
    return this.usersRepository.update(user.id, { ...user });
  }
}
