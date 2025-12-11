import { Int_Master_MaintenanceDetails } from 'src/models/master';
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
  tableName: TABLE_NAMES.MAINTENANCE_DETAILS,
  timestamps: false,
  paranoid: false,
})
export class MaintenanceTable extends Model<Int_Master_MaintenanceDetails> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, field: 'MNID' })
  MNID: number;

  @Column({ type: DataType.INTEGER, field: 'BikeID' })
  BikeID: number;

  @Column({ type: DataType.DATE, field: 'Service_Date' })
  Service_Date: Date;

  @Column({ type: DataType.STRING, field: 'Service_Type' })
  Service_Type: string;

  @Column({ type: DataType.NUMBER, field: 'Service_Cost' })
  Service_Cost: number;

  @Column({ type: DataType.NUMBER, field: 'Mileage' })
  Mileage: number;

  @Column({ type: DataType.STRING, field: 'Service_Center' })
  Service_Center: string;

  @Column({ type: DataType.STRING, field: 'Notes' })
  Notes: string;

  @Column({ type: DataType.DATE, field: 'CreatedAt' })
  CreatedAt: Date;
}
