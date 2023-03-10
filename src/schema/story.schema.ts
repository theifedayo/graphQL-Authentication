import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import {customAlphabet} from 'nanoid';
import { User } from "./user.schema";
import { MaxLength, MinLength } from "class-validator";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz123456789', 11)

@ObjectType()
@index({ storyId: 1})
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
    @prop({required: true, default: () => `story_${nanoid()}, unique: true}`})
    storyId: string
}


export const StoryModel = getModelForClass<typeof Story>(Story);

@InputType()
export class CreateStoryInput{
    @Field()
    title: string;

    @MinLength(120, {message: 'story body must be at least 120 characters'})
    @MaxLength(99999, {message: 'story body must not be more than 99999 characters'})
    @Field()
    body: string;
}


@InputType()
export class GetStoryInput{
    @Field()
    storyId: string;
}