import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import User from '../schema/userSchema';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();


export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // Req.body email pass irj baigaag shalgana ! baihgui bol shuud zogsono. 
        if (!email) {
            res.status(400).json({ success: false, message: `email is required` })
            return;
        }
        else if (!password) {
            res.status(400).json({ success: false, message: `password is required` })
            return;
        }
        //BCRYPT process
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt)
        //After Hashed Pass, Trying to Creating New User . (Schema validation baihgui bol error)
        try {
            const newUser = await User.create({ ...req.body, password: hash })
            const { password: _, ...userObj } = newUser.toObject();
            const token = jwt.sign({ userObj }, process.env.SECRET_KEY as string, { expiresIn: '1h' })
            res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
            });
            return;
            //Email davhardsan ERROR of MONGODP == UNIQUE : true
        } catch (error: any) {
            if (error.code === 11000 && error.keyPattern?.email) {
                res.status(400).json({
                    success: false,
                    message: `Oops! That email is already in use. Try logging in or use another one to register.`

                })
                return;
            }
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
            return;
        }
    }
    // Busad ymr neg aldaa garsan uyd 
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Unexpected server error',
        })
        return;
    }
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ success: false, message: 'Hmm… we couldn’t find that user. Try checking your email or sign up instead!' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Email or password is incorrect' });
            return;
        }

        const { password: _, ...userObj } = user.toObject();

        const token = jwt.sign({ userObj }, process.env.SECRET_KEY as string, { expiresIn: '1h' })
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });
        return;
    }
    catch (error: any) { res.status(500).json({ message: error.message || 'Server Error' }) }
}



