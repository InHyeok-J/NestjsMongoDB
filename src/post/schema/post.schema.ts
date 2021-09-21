import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const option: SchemaOptions = {
    timestamps: true,
};

@Schema(option)
export class Posts extends Document {
    @Prop({
        type: Types.ObjectId,
        require: true,
        ref: 'users',
    })
    @IsNotEmpty()
    author: Types.ObjectId;

    @Prop({
        requrie: true,
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @Prop({
        require: true,
    })
    @IsString()
    body: string;

    @Prop({
        default: 0,
        require: false,
    })
    @IsNumber()
    @IsPositive()
    likeCount: number;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
