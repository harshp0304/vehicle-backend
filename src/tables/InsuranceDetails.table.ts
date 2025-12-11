import { Int_Master_InsuranceDetails } from 'src/models/master';
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { TABLE_NAMES } from 'src/database/constants';

// Extend the interface to make INSID optional for creation
export interface InsuranceTableCreationAttributes extends Omit<
  Int_Master_InsuranceDetails,
  'INSID'
> {
  INSID?: number;
}

@Table({
  tableName: TABLE_NAMES.INSURANCE_DETAILS,
  timestamps: false,
  paranoid: false,
})
export class InsuranceTable extends Model<
  Int_Master_InsuranceDetails,
  InsuranceTableCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, field: 'INSID' })
  INSID: number;

  @Column({ type: DataType.INTEGER, field: 'BikeID' })
  BikeID: number;

  @Column({ type: DataType.STRING, field: 'CompanyName' })
  CompanyName: string;

  @Column({ type: DataType.STRING, field: 'Policy_Number' })
  Policy_Number: string;

  @Column({ type: DataType.DATE, field: 'Valid_From' })
  Valid_From: Date;

  @Column({ type: DataType.DATE, field: 'Valid_Until' })
  Valid_Until: Date;

  @Column({ type: DataType.INTEGER, field: 'Premium' })
  Premium: number;

  @Column({ type: DataType.INTEGER, field: 'Coverage_Amount' })
  Coverage_Amount: number;
}
