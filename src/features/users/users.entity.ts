import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './enum/role.enum';
import { TraceableEntity } from '../../core/database/abstracts/traceable.entity';

@Entity({ name: 'users' })
export class UsersEntity extends TraceableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
    default: 'public/img/users/default.png',
  })
  image: string;

  @Exclude()
  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  role: Role;
}
