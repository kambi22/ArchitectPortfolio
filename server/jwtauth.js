const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = 'gopybambrah'

const generatedToken = (userId)=>{
    return jwt.sign({userId}, secretKey);
}

const  verifyToken = (token)=>{
    return  jwt.verify(token, secretKey )
}
const  generateHash = async(passward)=>{
    return await bcrypt.hash(passward, 10)
}

const  comparePassword = async(password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = {generatedToken, verifyToken, generateHash, comparePassword}