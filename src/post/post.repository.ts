import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Posts } from './schema/post.schema';

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Posts.name) private readonly postModel: Model<Posts>,
    ) {}

    async findAll(): Promise<Posts[]> {
        try {
            return await this.postModel.find();
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }

    async findOneById(id: string | ObjectId): Promise<Posts> {
        try {
            return await this.postModel.findOne().where({ _id: id });
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }

    async create(
        author: ObjectId,
        title: string,
        body: string,
    ): Promise<Posts> {
        try {
            return await this.postModel.create({ author, title, body });
        } catch (err) {
            throw new HttpException('db Error', 500);
        }
    }
}
