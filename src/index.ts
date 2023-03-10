import dotenv from 'dotenv'
dotenv.config();
import 'reflect-metadata'
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import { resolvers } from './resolvers';
import { connectToDB } from './utils/mongo';
import { verifyJwt } from './utils/jwt';
import { User } from './schema/user.schema';
import Context from './types/context';
import authChecker from './utils/authChecker';



async function bootstrap() {

    const schema = await buildSchema({
        resolvers,
        authChecker
    })

    const app = express();

    app.use(cookieParser());

    const server = new ApolloServer({ 
        schema,
        context: (ctx: Context) => {
            const context = ctx;
            if(ctx.req.cookies.accessToken){
                const user = verifyJwt<User>(ctx.req.cookies.accessToken);

                context.user = user;
            }
            return ctx
        },
        plugins: [
            // Install a landing page plugin based on NODE_ENV
            process.env.NODE_ENV === 'production'
              ? ApolloServerPluginLandingPageProductionDefault(): ApolloServerPluginLandingPageLocalDefault(),
          ],
    });

    await server.start()
    server.applyMiddleware({ app })

    connectToDB()

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT)
    })

}

bootstrap();