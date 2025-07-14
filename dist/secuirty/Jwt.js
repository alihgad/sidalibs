"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTSecret = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: process.cwd() + "/.env" });
console.log(process.env.JWT_SECRET);
const generateToken = (payload, secret = process.env.JWT_SECRET, expireAt = "1d") => {
    return jsonwebtoken_1.default.sign(payload, secret);
};
exports.generateToken = generateToken;
const verifyToken = (token, secret = process.env.JWT_SECRET) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
const createJWTSecret = (length = 10) => {
    return [...Array(length)].map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
};
exports.createJWTSecret = createJWTSecret;
