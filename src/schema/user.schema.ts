import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";


@ObjectType()
export class User {
    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({required: true})
    name: string

    @Field(() => String)
    @prop({required: true})
    email: string

    @prop({required: true})
    password: string
}


export const UserModel = getModelForClass(User);

@InputType()

export class CreateUserInput {
    @Field(() => String)
    name: string

    @IsEmail()
    @Field(() => String)
    email: string

    @MinLength(6, {message: "Password must be min of 6 characters"})
    @MaxLength(50, {message: "Password must be max of 50 characters"})
    @Field(() => String)
    password: string
}