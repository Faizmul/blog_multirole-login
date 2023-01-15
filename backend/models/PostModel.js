import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";

const { DataTypes } = Sequelize;

const Posts = db.define('posts',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 100]
            }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 100]
            }
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 100]
            }
    },
    post:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty:true,
            }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true,
            }
    }
},{
    freezeTableName:true
});

Users.hasMany(Posts);
Posts.belongsTo(Users, {foreignKey: 'userId'});

export default Posts;  