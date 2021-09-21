import { PostRepository } from './post.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PostCreateDto } from './dto/post.create.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class PostService {
    constructor(private postRepository: PostRepository) {}

    async getAllPosts() {
        try {
            const posts = this.postRepository.findAll();
            return posts;
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async getOnePost(id: string) {
        try {
            const exPost = this.postRepository.findOneById(id);
            if (!exPost) {
                throw new BadRequestException('존재하지 않는 포스트');
            }

            return exPost;
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async createPost(user: User, post: PostCreateDto) {
        try {
            const { title, body } = post;
            const newPost = await this.postRepository.create(
                user._id,
                title,
                body,
            );

            return await newPost.save();
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async like(id: string) {
        try {
            const post = await this.postRepository.findOneById(id);
            post.likeCount += 1;
            return await post.save();
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}
