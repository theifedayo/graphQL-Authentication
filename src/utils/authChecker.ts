import { AuthChecker } from "type-graphql";
import Context from "../types/context";

const authChecker: AuthChecker<Context> = ({ context }) => {
    //if the user does exist return true
    return !!context.user; 
}


export default authChecker;