import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserMasterTable } from 'src/tables/User.table';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof UserMasterTable,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(MobileNo: string, Password: string): Promise<any> {
    console.log('Validating user:', MobileNo);
    const user = await this.userRepository.findOne({
      where: { MobileNo: MobileNo, Password: Password },
    });
    console.log('User found:', user ? 'Yes' : 'No');

    if (user) {
      const { Password, ...result } = user['dataValues'] || user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      MobileNo: user.MobileNo,
      Password: user.Password,
      sub: user.UMID,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  // async signup(userDto: any) {
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(userDto.Password, salt);
  //   const newUser = await this.userRepository.create({
  //     ...userDto,
  //     Password: hashedPassword,
  //   });
  //   const { Password, ...result } = newUser.dataValues;
  //   return result;
  // }
}
