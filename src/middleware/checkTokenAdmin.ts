import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRoleEnum } from '../enums/userRoleEnum';

export const checkTokenAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: 'Missing authorization header',
            });
            return
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string)

        if (typeof decoded !== 'string' && 'userObj' in decoded && decoded.userObj.role != UserRoleEnum.ADMIN) {
            res.status(403).json({
                success: false,
                message: 'Access denied',
            });
            return
        }
        next();
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
        return
    }
};