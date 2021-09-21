import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './../user/user.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                };
            },
            inject: [ConfigService],
        }),
        forwardRef(() => UserModule),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
