const userModel = require("../models/user.model");

module.exports.createUser = async ({ email, firstname, lastname, password }) => { 
    if (!email || !firstname || !password) {
        throw new Error("Missing required fields");
    }
    const user = new userModel({
        fullname: { firstname, lastname },
        email,
        password
    });
    return user;
}