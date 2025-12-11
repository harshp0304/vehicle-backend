import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaintenanceDetailDto {
  @ApiProperty()
  @IsNumber()
  BikeID: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  Service_Date: Date;

  @ApiProperty()
  @IsNumber()
  Service_Cost: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Service_Type?: string;

  @ApiProperty()
  @IsNumber()
  Mileage: number;

  @ApiProperty()
  @IsString()
  Service_Center: string;

  @ApiProperty()
  @IsString()
  Notes: string;

  @ApiProperty({ required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  CreatedAt?: Date;
}

export class UpdateMaintenanceDetailDto extends CreateMaintenanceDetailDto {}
