import { UserRequestDto } from './dto/user.request.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async create(data: UserRequestDto): Promise<User> {
        try {
            return await this.userModel.create(data);
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            return await this.userModel.findOne().where({ email });
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.userModel.find();
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }

    async findById(id): Promise<User | null> {
        try {
            return await this.userModel
                .findOne()
                .where({ _id: id })
                .select('-password');
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }
}
