import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../schemas/user.schema';

export class UserResponseDto extends PickType(User, [
    'email',
    'name',
    'nickname',
    'posts',
] as const) {
    @IsString()
    id: string;
}
