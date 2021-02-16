import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TraceableEntity {
  @CreateDateColumn({
    name: 'create_date',
  })
  createDate: Date;

  @UpdateDateColumn({
    name: 'update_date',
  })
  updateDate: Date;

  @DeleteDateColumn({
    name: 'delete_date',
  })
  deleteDate: Date;
}
