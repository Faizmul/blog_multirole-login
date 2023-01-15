import Users from "../models/UserModel.js"
import bcrypt from "bcrypt";

export const getUsers = async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getUserById = async(req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createUser = async(req, res) => {
    const { name, email, password, repeatPassword, role} = req.body;
    if(password !== repeatPassword) return res.status(400).json({msg: "Password harus sama !!!"});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Pendaftaran berhasil..."});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const updateUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const { name, email, password, repeatPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    } else{
        hashPassword = await bcrypt.hash(password);
    }
    if(password !== repeatPassword) return res.status(400).json({msg: "Password harus sama !!!"});
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Update berhasil..."});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const deleteUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Dihapus..."});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}