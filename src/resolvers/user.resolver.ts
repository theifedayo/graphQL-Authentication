import { Query, Resolver } from "type-graphql";
import { User } from "../schema/user.schema";


@Resolver()
export default class UserResolver {
    @Query(() => User)
    me(){
        return {
            _id: "123",
            name: "Ifedayo Adesiyan",
            email: "ifedayo@gmail.com"
        }
    }
}

touch s.env;echo >> "node_modules";git add .;git commit -m"Add .env file"