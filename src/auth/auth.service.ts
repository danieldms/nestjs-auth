import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService) { }

    async sign(payload: any) {
        return this.jwtService.sign(payload);
    }

    async validate(payload): Promise<any> {
        const { email, pass } = payload;
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(pass, user.password)) {
            return this.userService.sanitize(user);
        }

        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
}
