import StoryResolver from "./story.resolver";
import UserResolver from "./user.resolver";


export const resolvers = [UserResolver, StoryResolver] as const;