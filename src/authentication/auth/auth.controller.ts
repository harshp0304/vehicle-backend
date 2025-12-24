import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/models/dto/loigin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('signup')
  // async signup(@Body() userDto: any) {
  //   return this.authService.signup(userDto);
  // }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.MobileNo,
        loginDto.Password,
      );

      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      return this.authService.login(user);
    } catch (error) {
      throw new HttpException(
        (error as any).message || 'Login failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
