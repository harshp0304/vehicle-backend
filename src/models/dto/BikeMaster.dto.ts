import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateInsuranceDetailDto {
  @ApiProperty()
  @IsString()
  CompanyName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Policy_Number?: string;

  @ApiProperty()
  @IsString()
  Valid_Until: Date;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  Premium?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  Coverage_Amount?: number;
}

class CreateMaintenanceDetailNestedDto {
  @ApiProperty()
  @IsString()
  Service_Date: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Service_Cost?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Service_Type?: string;

  @ApiProperty()
  @IsString()
  Mileage: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Service_Center?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Notes?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  CreatedAt?: string;
}

export class CreateBikeMasterDto {
  @ApiProperty()
  @IsNumber()
  BikeID: number;

  @ApiProperty()
  @IsString()
  BikeName: string;

  @ApiProperty()
  @IsString()
  Model: string;

  @ApiProperty()
  @IsString()
  Brand: string;

  @ApiProperty()
  @IsString()
  Color: string;

  @ApiProperty()
  @IsString()
  PurchaseDate: Date;

  @ApiProperty()
  @IsString()
  Valid_Until: Date;

  @ApiProperty()
  @IsNumber()
  Amount: number;

  @ApiProperty()
  @IsString()
  RegistrationNo: string;

  @ApiProperty()
  @IsString()
  FuelType: string;

  @ApiProperty({ type: [CreateInsuranceDetailDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInsuranceDetailDto)
  @IsOptional()
  InsuranceDetails?: CreateInsuranceDetailDto[];

  @ApiProperty({ type: [CreateMaintenanceDetailNestedDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMaintenanceDetailNestedDto)
  @IsOptional()
  MaintenanceDetails?: CreateMaintenanceDetailNestedDto[];
}

export class UpdateBikeMasterDto extends CreateBikeMasterDto {}
