import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const option: SchemaOptions = {
    timestamps: true,
};

@Schema(option)
export class User extends Document {
    @Prop({
        require: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Prop({
        requrie: true,
        unique: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Prop()
    @IsString()
    password: string;

    @Prop({
        require: true,
    })
    @IsString()
    @IsNotEmpty()
    nickname: string;

    readonly readOnlyData: {
        id: string;
        email: string;
        name: string;
        nickname: string;
    };
}

export const UserSchema = SchemaFactory.createForClass(User);

//몽구스에서 버츄얼 필드를 제공해줌, 실제 DB에 저장되지는 않지만 비지니스 로직으로 사용 가능.
UserSchema.virtual('readOnlyData').get(function (this: User) {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        nickname: this.nickname,
    };
});
