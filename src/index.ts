import dotenv from 'dotenv'
dotenv.config();
import 'reflect-metadata'
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import { resolvers } from './resolvers';



async function bootstrap() {

    const schema = await buildSchema({
        resolvers,
       // authChecker
    })

    const app = express();

    app.use(cookieParser());

    const server = new ApolloServer({ 
        schema,
        context: (ctx) => {
            return ctx
        },
        // plugins: [
        //     // Install a landing page plugin based on NODE_ENV
        //     process.env.NODE_ENV === 'production'
        //       ? ApolloServerPluginLandingPageProductionDefault(): ApolloServerPluginLandingPageLocalDefault(),
        //   ],
    });

    await server.start()
    server.applyMiddleware({ app })

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT)
    })

}

bootstrap();