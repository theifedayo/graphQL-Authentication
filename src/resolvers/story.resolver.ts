import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateStoryInput, Story } from "../schema/story.schema";
import StoryService from "../service/story.service";
import Context from "../types/context";


@Resolver()
export default class StoryResolver{
    constructor(private storyService: StoryService){
        this.storyService = new StoryService()
    }

    @Authorized()
    @Mutation(()=> Story)
    createStory(@Arg('input') input: CreateStoryInput, @Ctx() context: Context){
        const user = context.user!; //this user will never be null hence !
        return this.storyService.createStory({ ...input, user: user?._id});
    }

}