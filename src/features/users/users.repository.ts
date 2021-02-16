import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  async findUsers(): Promise<UsersEntity[]> {
    return this.find();
  }

  async findUserById(id): Promise<UsersEntity> {
    return this.findOne({ id });
  }

  async findUserByEmail(email): Promise<UsersEntity> {
    return this.findOne({ email });
  }
}
