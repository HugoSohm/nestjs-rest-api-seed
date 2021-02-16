import { Factory, Seeder } from 'typeorm-seeding';
import { UsersEntity } from '../../../../features/users/users.entity';

export class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(UsersEntity)().createMany(5);
  }
}
