import { AuthService } from './../auth/auth.service';
import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { SuccessInterceptor } from '../common/interceptors/success.interceptors';
import { UserRequestDto } from './dto/user.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Get('list')
    async findAll(): Promise<UserResponseDto[]> {
        return await this.userService.userList();
    }

    @Post('emailCheck')
    async emailCheck(@Body() body): Promise<string | UserResponseDto> {
        return await this.userService.emailCheck(body.email);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUserInfo(@UserDecorator() user): UserResponseDto {
        return user.readOnlyData;
    }

    @Post()
    async singup(@Body() body: UserRequestDto): Promise<UserResponseDto> {
        return await this.userService.signUp(body);
    }

    @Post('login')
    async login(@Body() body: LoginRequestDto) {
        return await this.authService.jwtLogin(body);
    }
}
