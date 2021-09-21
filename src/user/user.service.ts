import { ConfigService } from '@nestjs/config';
import { UserRequestDto } from './dto/user.request.dto';
import {
    Injectable,
    HttpException,
    UnauthorizedException,
} from '@nestjs/common';
import * as bycrpt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private readonly ConfigService: ConfigService,
    ) {}

    async signUp(body: UserRequestDto) {
        const { email, name, nickname, password } = body;
        const isUserExist = await this.userRepository.findByEmail(email);
        if (isUserExist) {
            // throw new HttpException('유저가 이미 존재', 404);
            throw new UnauthorizedException('Email의 유저가 이미 존재');
        }

        const hashedPassword = await bycrpt.hash(password, 10);

        const User = await this.userRepository.create({
            email,
            name,
            password: hashedPassword,
            nickname,
        });

        if (!User) {
            throw new HttpException('알수없는 에러', 500);
        }

        return User.readOnlyData;
    }

    async userList() {
        console.log(this.ConfigService.get('JWT_SECRET'));
        const UserList = await this.userRepository.findAll();
        console.log(UserList[0]);

        if (!UserList) {
            throw new HttpException('알수없는 에러', 500);
        }
        return UserList.map((user) => user.readOnlyData);
    }

    async emailCheck(email: string) {
        const findUser = await this.userRepository.findByEmail(email);

        if (!findUser) {
            return '해당하는 유저 없음';
        }

        return findUser.readOnlyData;
    }
}
