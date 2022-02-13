"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const user_controller_1 = require("../controllers/user.controller");
const roadmap_controller_1 = require("../controllers/roadmap.controller");
const authJWT_1 = __importDefault(require("../middlewares/authJWT"));
const router = express_1.default.Router();
router.post('/register', [
    (0, express_validator_1.check)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email anda tidak valid'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 8 })
        .withMessage('Password harus lebih dari 8 huruf'),
], auth_controller_1.signup);
router.post('/login', auth_controller_1.signin);
router.get('/users', authJWT_1.default, user_controller_1.getAllUsers);
router.patch('/user/:id', authJWT_1.default, user_controller_1.updateUser);
router.delete('/user/:id', authJWT_1.default, user_controller_1.deleteUser);
router.post('/roadmap', authJWT_1.default, roadmap_controller_1.addRoadmap);
router.get('/roadmap', authJWT_1.default, roadmap_controller_1.getRoadmaps);
router.get('/roadmaps', roadmap_controller_1.getAcceptedRoadmaps);
router.get('/roadmap/:id', authJWT_1.default, roadmap_controller_1.getRoadmap);
router.patch('/roadmap/:id', authJWT_1.default, roadmap_controller_1.editRoadmap);
router.delete('/roadmap/:id', authJWT_1.default, roadmap_controller_1.deleteRoadmap);
exports.default = router;
