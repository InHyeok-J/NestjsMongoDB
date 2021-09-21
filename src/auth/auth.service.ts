import { LoginRequestDto } from './dto/login.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async jwtLogin(data: LoginRequestDto) {
        const { email, password } = data;

        const exUser = await this.userRepository.findByEmail(email);

        if (!exUser) {
            throw new UnauthorizedException(
                '이메일에 해당하는 유저가 없습니다.',
            );
        }

        const comparePassword = await bcrypt.compare(password, exUser.password);

        if (!comparePassword) {
            throw new UnauthorizedException('패스워드가 일치하지 않습니다.');
        }

        const payload = { email: email, sub: exUser.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
