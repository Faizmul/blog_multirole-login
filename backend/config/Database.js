import { Sequelize } from "sequelize";

const db = new Sequelize('auth_post','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;