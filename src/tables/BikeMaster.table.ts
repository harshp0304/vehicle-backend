import { Int_Master_Bike } from 'src/models/master';
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
  tableName: TABLE_NAMES.BIKE_MASTER,
  timestamps: false,
  paranoid: false,
})
export class BikeMasterTable extends Model<Int_Master_Bike> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, field: 'BikeID' })
  BikeID: number;

  @Column({ type: DataType.STRING, field: 'BikeName' })
  BikeName: string;

  @Column({ type: DataType.STRING, field: 'Brand' })
  Brand: string;

  @Column({ type: DataType.STRING, field: 'Model' })
  Model: string;

  @Column({ type: DataType.STRING, field: 'Amount' })
  Amount: string;

  @Column({ type: DataType.STRING, field: 'PurchaseDate' })
  PurchaseDate: string;

  @Column({ type: DataType.STRING, field: 'RegistrationNo' })
  RegistrationNo: string;

  @Column({ type: DataType.STRING, field: 'Valid_Until' })
  Valid_Until: string;

  @Column({ type: DataType.STRING, field: 'Insurance' })
  Insurance: string;

  @Column({ type: DataType.STRING, field: 'Color' })
  Color: string;

  @Column({ type: DataType.STRING, field: 'FuelType' })
  FuelType: string;
}
