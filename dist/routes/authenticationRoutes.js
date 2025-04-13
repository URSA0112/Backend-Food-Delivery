"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authenticationController_1 = require("../controller/authenticationController");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post('/signUp', authenticationController_1.signUp)
    .post('/login', authenticationController_1.login);
