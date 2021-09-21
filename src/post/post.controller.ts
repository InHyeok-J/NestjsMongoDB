import { SuccessInterceptor } from './../common/interceptors/success.interceptors';
import { PostService } from './post.service';
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { PostCreateDto } from './dto/post.create.dto';
import { Posts } from './schema/post.schema';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';

@Controller('post')
@UseInterceptors(SuccessInterceptor)
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async getAllpost(): Promise<Posts[]> {
        return this.postService.getAllPosts();
    }

    @Get(':id')
    async postInfo(@Param('id') id: string) {
        return this.postService.getOnePost(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(
        @UserDecorator() user,
        @Body() PostCreateDto: PostCreateDto,
    ) {
        return this.postService.createPost(user, PostCreateDto);
    }

    @Patch('like/:id')
    async postlike(@Param('id') id: string) {
        return this.postService.like(id);
    }
}
