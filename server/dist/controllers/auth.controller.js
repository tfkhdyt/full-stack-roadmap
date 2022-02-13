"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../models/user.model"));
const signup = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        res.status(404).json({
            errors: errors.array(),
        });
        return;
    }
    const { fullName, email, password, role } = req.body;
    const user = new user_model_1.default({
        fullName,
        email,
        password: bcrypt_1.default.hashSync(password, 8),
        role: role,
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({
                message: err,
            });
        }
        else {
            res.status(200).send({
                message: 'User registered successfully',
                data: user,
            });
        }
    });
};
exports.signup = signup;
const signin = (req, res) => {
    const API_SECRET = process.env.API_SECRET;
    user_model_1.default.findOne({
        email: req.body.email,
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: err,
            });
        }
        if (!user) {
            return res.status(404).send({
                message: 'User not found.',
            });
        }
        const passwordIsValid = bcrypt_1.default.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid password!',
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
        }, API_SECRET, {
            expiresIn: '30d',
        });
        res.status(200).send({
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            },
            message: 'Login success',
            accessToken: token,
        });
    });
};
exports.signin = signin;
