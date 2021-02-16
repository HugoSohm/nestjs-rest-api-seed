import { define } from 'typeorm-seeding';
import { UsersEntity } from '../../../../features/users/users.entity';
import { CryptoUtils } from '../../../utils/CryptoUtils';
import { Role } from '../../../../features/users/enum/role.enum';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
define(UsersEntity, async (faker: typeof Faker) => {
  const user = new UsersEntity();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email().toLowerCase();
  user.phone = faker.phone.phoneNumber();
  user.image = 'https://i.pravatar.cc/500';
  user.password = await CryptoUtils.getHash('password');
  user.role = Role.User;
  return user;
});
