import { CreateStoryInput, GetStoryInput, StoryModel } from "../schema/story.schema";
import { User } from "../schema/user.schema";

class StoryService {
    async createStory(input: CreateStoryInput & {user: User['_id']}){
        return StoryModel.create(input);
    }

    async findStories(){
        return StoryModel.find().lean();
    }

    async findSingleStory(input: GetStoryInput){
        return StoryModel.findOne(input).lean();
    }
}


export default StoryService;