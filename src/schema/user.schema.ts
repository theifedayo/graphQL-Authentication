import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";


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