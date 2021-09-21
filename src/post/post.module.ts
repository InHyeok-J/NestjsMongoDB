import { AuthModule } from './../auth/auth.module';
import { UserModule } from './../user/user.module';
import { PostRepository } from './post.repository';
import { Posts, PostSchema } from './schema/post.schema';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
        UserModule,
    ],
    controllers: [PostController],
    providers: [PostService, PostRepository],
})
export class PostModule {}
