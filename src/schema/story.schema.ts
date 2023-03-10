import { prop, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user.schema";

@ObjectType()
export class Story {
    @Field(()=>String)
    _id: string;

    @Field(()=>String)
    @prop({required: true, ref: () => User})
    user: Ref<User>;

    @Field(()=>String)
    @prop({required: true})
    title: string

    @Field(()=>String)
    @prop({required: true})
    body: string

    @Field(()=>String)
    @prop({required: true})
    storyId: string
}