import dotenv from 'dotenv'
dotenv.config();
import 'reflect-metadata'
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';




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
            console.log(ctx)
            return ctx
        },
        plugins: [
            // Install a landing page plugin based on NODE_ENV
            process.env.NODE_ENV === 'production'
              ? ApolloServerPluginLandingPageProductionDefault({
                  graphRef: 'my-graph-id@my-graph-variant',
                  footer: false,
                })
              : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
          ],
    });

    await server.start()
    server.applyMiddleware({ app })

    app.listen({ port: 4000}, () => {
        console.log("Server is running on port: 4000")
    })

}

bootstrap();