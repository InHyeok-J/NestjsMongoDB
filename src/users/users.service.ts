import { User, UserSchema } from './schemas/user.schema';
import { UserRequestDto } from './dto/users.request.dto';
import {
    Injectable,
    HttpException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bycrpt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async signUp(body: UserRequestDto) {
        const { email, name, nickname, password } = body;
        const isUserExist = await this.userModel.exists({ email });
        if (isUserExist) {
            // throw new HttpException('유저가 이미 존재', 404);
            throw new UnauthorizedException('유저가 이미 존재');
        }

        const hashedPassword = await bycrpt.hash(password, 10);

        const User = await this.userModel.create({
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
}
