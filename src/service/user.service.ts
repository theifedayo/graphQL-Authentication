import { ApolloError } from "apollo-server";
import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import bcrypt from 'bcrypt';
import { signJwt } from "../utils/jwt";
import Context from "../types/context";

class UserService {
    async createUser(input: CreateUserInput){
        return await UserModel.create(input);
    }


    async login(input: LoginInput, context: Context){
        const user = await UserModel.find().findByEmail(input.email).lean();
        if(!user){
            throw new ApolloError("Invalid email or password")
        }
        const passwordIsValid = await bcrypt.compare(input.password, user.password)
        if(!passwordIsValid){
            throw new ApolloError("Invalid email or password")
        }

        const token = signJwt(user)
        context.res.cookie("assessToken", token, {
            maxAge: 3.154e10,
            httpOnly: true,
            domain: "localhost", //TODO: Set this in my config
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production", //true in production
        });

        return token
        
    }
}


export default UserService;