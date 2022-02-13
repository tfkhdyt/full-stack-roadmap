"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserData = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).send({
            message: 'Invalid JWT Token',
        });
    }
    if (req.user.role == 'admin') {
        const users = yield user_model_1.default.find();
        res.status(200).send({
            message: 'query success!',
            data: users,
        });
    }
    else {
        res.status(403).send({
            message: 'Unauthorized access!',
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _user = (yield user_model_1.default.findOne({
        _id: id,
    }));
    res.status(200).send({
        message: 'query success!',
        data: _user,
    });
});
exports.getUserData = getUserData;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).send({
            message: 'Invalid JWT Token',
        });
    }
    if (req.user.role == 'admin') {
        const { id } = req.params;
        let updatedUser;
        try {
            updatedUser = yield user_model_1.default.findById(id);
        }
        catch (err) {
            res.status(404).send({
                message: 'User not found',
                data: err.message,
            });
        }
        const { fullName, role, email, password } = updatedUser;
        const _fullName = req.body.fullName || fullName;
        const _role = req.body.role || role;
        const _email = req.body.email || email;
        const _password = req.body.password || password;
        try {
            updatedUser = yield user_model_1.default.findByIdAndUpdate(id, {
                fullName: _fullName,
                role: _role,
                email: _email,
                password: bcrypt_1.default.hashSync(_password, 8),
            });
        }
        catch (err) {
            res.send({
                message: 'update failed!',
                data: err.message,
            });
        }
        res.status(200).send({
            message: 'update success!',
            data: updatedUser,
        });
    }
    else {
        res.status(403).send({
            message: 'Unauthorized access!',
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).send({
            message: 'Invalid JWT Token',
        });
    }
    if (req.user.role == 'admin') {
        const { id } = req.params;
        let deletedUser;
        try {
            deletedUser = yield user_model_1.default.findByIdAndDelete(id);
        }
        catch (err) {
            res.send({
                message: 'delete failed!',
                data: err.message,
            });
        }
        res.status(200).send({
            message: 'delete success!',
            data: deletedUser,
        });
    }
    else {
        res.status(403).send({
            message: 'Unauthorized access!',
        });
    }
});
exports.deleteUser = deleteUser;
