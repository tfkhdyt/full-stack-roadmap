"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const verifyToken = (req, res, next) => {
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer') {
        jsonwebtoken_1.default.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, (err, decode) => {
            if (err) {
                req.user = undefined;
                next();
            }
            user_model_1.default.findOne({
                _id: decode.id,
            }).exec((err, user) => {
                if (err) {
                    res.status(500).send({
                        message: err,
                    });
                }
                else {
                    req.user = user;
                    next();
                }
            });
        });
    }
    else {
        req.user = undefined;
        next();
    }
};
exports.default = verifyToken;
