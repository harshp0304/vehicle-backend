import { Int_Master_User } from 'src/models/master';
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { TABLE_NAMES } from 'src/database/constants';

@Table({
  tableName: TABLE_NAMES.USER_MASTER,
  timestamps: false,
  paranoid: false,
})
export class UserMasterTable extends Model<Int_Master_User> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, field: 'UMID' })
  UMID: number;

  @Column({ type: DataType.STRING, field: 'MobileNo' })
  MobileNo: string;

  @Column({ type: DataType.STRING, field: 'Password' })
  Password: string;
}
