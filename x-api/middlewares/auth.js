require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

/***
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

function auth(req, res, next) {
    //if correct token next()
    //else respond error code
    const { authorization } = req.headers;

    // authorization : Bearer token , so split with space and get on index 1
    const token = authorization && authorization.split(" ")[1];
    if (!token) {
        return res.status(400).json({
            msg: 'Token required'
        });
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
        return res.status(401).json({
            msg: 'Incorrect token'
        });
    }

    res.locals.user = user;
    next();
}

module.exports = { auth };