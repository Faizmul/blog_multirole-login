import Posts from "../models/PostModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getPosts = async(req, res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Posts.findAll({
                attributes: ['uuid', 'author', 'title', 'category', 'post' ],
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        } else{
            response = await Posts.findAll({
                attributes: ['uuid', 'author', 'title', 'category', 'post' ],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}
export const getPostById = async(req, res) => {
    try {
        const posts = await Posts.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!posts) return res.status(404).json({msg: "Data tidak ditemukan"})
        let response;
        if(req.role === "admin"){
            response = await Posts.findOne({
                attributes: ['uuid', 'author', 'title', 'category', 'post' ],
                where:{
                    id: posts.id
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        } else{
            response = await Posts.findOne({
                attributes: ['uuid', 'author', 'title', 'category', 'post' ],
                where:{
                    [Op.and]:[{id: posts.id}, {userId: req.userId}],
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createPost = async(req, res) => {
    const {author, title, category, post } = req.body;
    try {
        await Posts.create({
            author: author,
            title: title,
            category: category,
            post: post,
            userId: req.userId
        });
        res.status(201).json({msg:"Post Created Successfuly"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const updatePost = async(req, res) => {
    try {
        const posts = await Posts.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!posts) return res.status(404).json({msg: "Data tidak ditemukan"})
        const {author, title, category, post } = req.body;
        if(req.role === "admin"){
            await Posts.update({author, title, category, post }, {
                where:{
                    id: posts.id
                }
            });
        } else{
            if(req.userId !== posts.userId) return res.status(403).json({msg: "Hanya admin...!"})
            await Posts.update({author, title, category, post }, {
                where:{
                    [Op.and]:[{id: posts.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Postingan terupdate..."});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const deletePost = async(req, res) => {
    try {
        const posts = await Posts.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!posts) return res.status(404).json({msg: "Data tidak ditemukan"})
        const {author, title, category, post } = req.body;
        if(req.role === "admin"){
            await Posts.destroy({
                where:{
                    id: posts.id
                }
            });
        } else{
            if(req.userId !== posts.userId) return res.status(403).json({msg: "Hanya admin...!"})
            await Posts.destroy({
                where:{
                    [Op.and]:[{id: posts.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Postingan terhapus..."});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}