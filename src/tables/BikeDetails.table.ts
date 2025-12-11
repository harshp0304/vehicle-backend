import { Int_Master_BikeDetails } from 'src/models/master';
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
  tableName: TABLE_NAMES.BIKE_DETAILS,
  timestamps: false,
  paranoid: false,
})
export class BikeDetailsTable extends Model<Int_Master_BikeDetails> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, field: 'BDID' })
  BDID: number;

  @Column({ type: DataType.INTEGER, field: 'BikeID' })
  BikeID: number;

  @Column({ type: DataType.INTEGER, field: 'InsuranceID' })
  InsuranceID: number;

  @Column({ type: DataType.STRING, field: 'InsuranceName' })
  InsuranceName: string;

  @Column({ type: DataType.DATE, field: 'InsuranceStartDate' })
  InsuranceStartDate: Date;

  @Column({ type: DataType.DATE, field: 'InsuranceEndDate' })
  InsuranceEndDate: Date;
}
