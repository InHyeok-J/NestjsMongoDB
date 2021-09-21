import { PickType } from '@nestjs/swagger';
import { Posts } from '../schema/post.schema';

export class PostCreateDto extends PickType(Posts, [
    'title',
    'body',
] as const) {}
