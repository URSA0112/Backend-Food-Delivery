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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    try {
        // Req.body email pass irj baigaag shalgana ! baihgui bol shuud zogsono. 
        if (!email) {
            res.status(400).json({ success: false, message: `email is required` });
            return;
        }
        else if (!password) {
            res.status(400).json({ success: false, message: `password is required` });
            return;
        }
        //BCRYPT process
        const salt = yield bcrypt_1.default.genSalt(12);
        const hash = yield bcrypt_1.default.hash(password, salt);
        //After Hashed Pass, Trying to Creating New User . (Schema validation baihgui bol error)
        try {
            const newUser = yield userSchema_1.default.create(Object.assign(Object.assign({}, req.body), { password: hash }));
            res.status(201).json({
                success: true,
                message: `UserCreated ${newUser}`
            });
            //Email davhardsan ERROR of MONGODP == UNIQUE : true
        }
        catch (error) {
            if (error.code === 11000 && ((_a = error.keyPattern) === null || _a === void 0 ? void 0 : _a.email)) {
                res.status(400).json({
                    success: false,
                    message: 'This email is already registered. Please use another one.'
                });
            }
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
            return;
        }
    }
    // Busad ymr neg aldaa garsan uyd 
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Unexpected server error',
        });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userSchema_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: 'Email or password is incorrect' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Email or password is incorrect' });
            return;
        }
        const _a = user.toObject(), { password: _ } = _a, userObj = __rest(_a, ["password"]);
        const token = jsonwebtoken_1.default.sign({ userObj }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
});
exports.login = login;
