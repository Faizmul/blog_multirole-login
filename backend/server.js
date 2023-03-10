import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app =express();

const sessionBlog = SequelizeStore(session.Store);

const store = new sessionBlog({
    db: db
});

// (async() => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));


app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(PostRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server running at port 5000');
});