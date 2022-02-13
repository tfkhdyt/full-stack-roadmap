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
exports.getAcceptedRoadmaps = exports.deleteRoadmap = exports.getRoadmap = exports.editRoadmap = exports.getRoadmaps = exports.addRoadmap = void 0;
const roadmap_model_1 = __importDefault(require("../models/roadmap.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const addRoadmap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).send({
            message: 'Invalid JWT Token',
        });
    }
    try {
        const result = yield roadmap_model_1.default.create(Object.assign(Object.assign({}, req.body), { accepted: req.user.role == 'admin' ? true : false, userId: req.user._id }));
        res.status(200).send({
            message: 'Input data berhasil',
            data: result,
        });
    }
    catch (err) {
        res.status(500).send({
            message: 'Input data gagal',
            data: err.message,
        });
    }
});
exports.addRoadmap = addRoadmap;
const getRoadmaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).send({
            message: 'Invalid JWT token',
        });
    }
    if (req.user.role === 'admin') {
        try {
            const result = yield roadmap_model_1.default.find().sort('order');
            res.status(200).send({
                message: 'Query berhasil',
                data: result,
                role: req.user.role,
            });
        }
        catch (err) {
            res.status(500).send({
                message: 'Query gagal',
                data: err.message,
            });
        }
    }
    else {
        try {
            const result = yield roadmap_model_1.default
                .find({
                userId: req.user._id,
            })
                .sort('order');
            res.status(200).send({
                message: 'Query berhasil',
                data: result,
                role: req.user.role,
            });
        }
        catch (err) {
            res.status(500).send({
                message: 'Query gagal',
                data: err.message,
            });
        }
    }
});
exports.getRoadmaps = getRoadmaps;
const editRoadmap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).send({
            message: 'Invalid JWT Token',
        });
    }
    const { id } = req.params;
    let updatedData;
    try {
        updatedData = (yield roadmap_model_1.default.findById(id));
    }
    catch (err) {
        res.status(404).send({
            message: 'Data not found',
            data: err.message,
        });
    }
    const data = req.body;
    if (req.user.role !== 'admin' && data.accepted)
        delete data.accepted;
    try {
        const result = yield roadmap_model_1.default.findByIdAndUpdate(updatedData._id, data);
        res.status(200).send({
            message: 'Ubah data berhasil',
            data: result,
            role: req.user.role,
        });
    }
    catch (err) {
        res.status(500).send({
            message: 'Ubah data gagal',
            data: err.message,
        });
    }
});
exports.editRoadmap = editRoadmap;
const getRoadmap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).send({
            message: 'Invalid JWT token',
        });
    }
    const { id } = req.params;
    if (req.user.role === 'admin') {
        try {
            const result = (yield roadmap_model_1.default
                .findOne({
                _id: id,
            })
                .sort('order'));
            if (!result) {
                res.status(404).send({
                    message: 'Query gagal',
                    title: 'Data tidak ditemukan',
                });
            }
            const submitter = (yield user_model_1.default.findOne({
                _id: result.userId,
            }));
            res.status(200).send({
                message: 'Query berhasil',
                data: result,
                submitter: submitter.fullName,
                role: req.user.role,
            });
        }
        catch (err) {
            res.status(500).send({
                message: 'Query gagal',
                data: err.message,
            });
        }
    }
    else {
        try {
            const result = yield roadmap_model_1.default
                .findOne({
                _id: id,
                userId: req.user._id,
            })
                .sort('order');
            if (!result) {
                res.status(404).send({
                    message: 'Query gagal',
                    title: 'Data tidak ditemukan',
                });
            }
            res.status(200).send({
                message: 'Query berhasil',
                data: result,
                submitter: req.user.fullName,
            });
        }
        catch (err) {
            res.status(500).send({
                message: 'Query gagal',
                data: err.message,
            });
        }
    }
});
exports.getRoadmap = getRoadmap;
const deleteRoadmap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).send({
            message: 'Invalid JWT Token',
        });
    }
    const { id } = req.params;
    let deletedData;
    try {
        deletedData = (yield roadmap_model_1.default.findById(id));
    }
    catch (err) {
        res.status(404).send({
            message: 'Data not found',
            data: err.message,
        });
    }
    try {
        const result = yield roadmap_model_1.default.findByIdAndDelete(deletedData._id);
        res.status(200).send({
            message: 'Hapus data berhasil',
            data: result,
            role: req.user.role,
        });
    }
    catch (err) {
        res.status(500).send({
            message: 'Hapus data gagal',
            data: err.message,
        });
    }
});
exports.deleteRoadmap = deleteRoadmap;
const getAcceptedRoadmaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield roadmap_model_1.default.find({ accepted: true }).sort('order');
        res.status(200).send({
            message: 'Query berhasil',
            data: result,
        });
    }
    catch (err) {
        res.status(500).send({
            message: 'Query gagal',
            data: err.message,
        });
    }
});
exports.getAcceptedRoadmaps = getAcceptedRoadmaps;
