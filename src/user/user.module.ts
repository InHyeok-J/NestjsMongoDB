import { PostSchema } from './../post/schema/post.schema';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './../auth/auth.module';
import { UserController } from './user.controller';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { Posts } from 'src/post/schema/post.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            {
                name: Posts.name,
                schema: PostSchema,
            },
        ]),
        forwardRef(() => AuthModule),
        ConfigService,
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule {}
