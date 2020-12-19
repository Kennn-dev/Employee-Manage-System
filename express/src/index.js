import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { success, error } from "consola";
import cors from "cors";
import cookieParser from "cookie-parser";

// Construct a schema, using GraphQL schema language
import { typeDefs, resolvers } from "./graphql";
import authMiddleWare from "./middlewares/auth";

//app
const app = express();
// app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(authMiddleWare);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
//server Apl
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: corsOptions,
  context: ({ res, req }) => {
    // console.log(req.cookies);
    return {
      req,
      res,
    };
  },
});
// //get cookies from request
// app.use((req, _, next) => {
//   console.log(req.cookies);
//   next();
// });

const PORT = 4000;

const startApp = async () => {
  try {
    //connect to db here
    await mongoose.connect(
      "mongodb+srv://ken101299:1234@coffee-employee-mng.wi3ud.mongodb.net/coffee?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    success({
      badge: true,
      message: `MongoDB connected `,
    });

    // Inject apollo middleware on Express Application
    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: "http://localhost:3000",
      },
    });

    app.listen(PORT, () => {
      success({
        badge: true,
        message: `Server start at ${PORT}`,
      });
    });
  } catch (err) {
    error({
      message: err.message,
      badge: true,
    });
  }
};

startApp();
