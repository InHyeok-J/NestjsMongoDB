import { SuccessInterceptor } from './../common/interceptors/success.interceptors';
import { UserRequestDto } from './dto/users.request.dto';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): string {
        return ' test';
    }

    @Post()
    async singup(@Body() body: UserRequestDto) {
        return await this.userService.signUp(body);
    }
}
