"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const underscore_1 = __importDefault(require("underscore"));
const trimmer = (req, res, next) => {
    req.body = underscore_1.default.object(underscore_1.default.map(req.body, (value, key) => {
        if (typeof value === 'string')
            return [key, value.trim()];
        else
            return [key, value];
    }));
    next();
};
exports.default = trimmer;
