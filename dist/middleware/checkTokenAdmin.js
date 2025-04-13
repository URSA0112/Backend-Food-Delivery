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
exports.checkTokenAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRoleEnum_1 = require("../enums/userRoleEnum");
const checkTokenAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: 'Missing authorization header',
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (typeof decoded !== 'string' && 'userObj' in decoded && decoded.userObj.role != userRoleEnum_1.UserRoleEnum.ADMIN) {
            res.status(403).json({
                success: false,
                message: 'Access denied',
            });
            return;
        }
        next();
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
        return;
    }
});
exports.checkTokenAdmin = checkTokenAdmin;
