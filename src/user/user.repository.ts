import { PostSchema } from './../post/schema/post.schema';
import { UserRequestDto } from './dto/user.request.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}
    postModel = mongoose.model('posts', PostSchema);

    async create(data: UserRequestDto): Promise<User> {
        try {
            return await this.userModel.create(data);
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            return await this.userModel
                .findOne()
                .where({ email })
                .populate('posts', this.postModel);
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.userModel
                .find()
                .populate('posts', this.postModel);
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            return await this.userModel
                .findOne()
                .where({ _id: id })
                .select('-password')
                .populate('posts', this.postModel);
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }
}
