import { PickType } from '@nestjs/swagger';
import { User } from 'src/user/schemas/user.schema';

export class LoginRequestDto extends PickType(User, [
    'email',
    'password',
] as const) {}
