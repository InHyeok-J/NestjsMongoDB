import { Payload } from './jwt.payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.JWT_SECRET}`,
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload) {
        const exUesr = await this.userRepository.findById(payload.sub);

        if (exUesr) {
            return exUesr;
        } else {
            throw new UnauthorizedException('인증 실패');
        }
    }
}
