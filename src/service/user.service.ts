import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";

class UserService {
    async createUser(input: CreateUserInput){
        return await UserModel.create(input);
    }


    async login(input: LoginInput){
        
    }
}


export default UserService;