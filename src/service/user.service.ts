import { UserModel } from "../schema/user.schema";

class UserService {
    async createUser(input: any){
        return await UserModel.create(input);
    }
}


export default UserService;