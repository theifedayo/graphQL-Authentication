import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import bcrypt from 'bcrypt';

@pre<User>('save', async function(){
    //check that the password is been modified
    if(!this.isModified('password')){
        return
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;
})
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


@InputType()
export class LoginInput {
    @IsEmail()
    @Field(() => String)
    email: string

    @Field(() => String)
    password: string
}
