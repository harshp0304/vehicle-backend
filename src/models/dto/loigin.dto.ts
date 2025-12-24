import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'UserMobile' })
  @IsString({ message: 'UserMobile must be a string' })
  @IsNotEmpty({ message: 'UserMobile is required' })
  MobileNo: string;

  @ApiProperty({ description: 'password' })
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  Password: string;
}
