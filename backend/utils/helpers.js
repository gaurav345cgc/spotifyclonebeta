
const jwt = require("jsonwebtoken");
exports ={}


exports.getToken = async(email,username) => {
    const token = jwt.sign({identifier: user._id},"gaurav345");
    return token;
};

module.exports = exports;