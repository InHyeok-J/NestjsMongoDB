import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRequestDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    nickname: string;
}
