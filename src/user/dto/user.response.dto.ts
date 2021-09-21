import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../schemas/user.schema';

export class UserResponseDto extends PickType(User, [
    'email',
    'name',
    'nickname',
] as const) {
    @IsString()
    id: string;
}
