import express, { Router } from 'express';
import { UserSignupSchema, UserSignupType, UserSigninSchema, UserSigninType } from '../types/types.js';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/signup', express.json(), async (req, res) => {
    try {
        const recivedBody = req.body;
        const paresedBody = UserSignupSchema.safeParse(recivedBody);
        
        if(!paresedBody.success) {
            res.status(400).json({
                msg: null,
                data: null,
                error: paresedBody.error.issues
            });
            return;
        }

        const body: UserSignupType = paresedBody.data;

        const userWithEmail = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        const userWithUsername = await prisma.user.findUnique({
            where: {
                username: body.username
            }
        });

        if(userWithEmail || userWithUsername) {
            res.status(403).json({
                msg: null,
                data: null,
                error: "User Already Exists"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                password: hashedPassword
            }
        }); 

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            msg: "User Created",
            data: {
                username: user.username,
                token: token
            },
            error: null
        });
    } catch(err) {
        res.status(500).json({
            msg: null,
            data: null,
            error: "Internal Server Error"
        });
    }
});

router.post('/signin', express.json(), async (req, res) => {
    try {
        const recivedBody = req.body;
        const paresedBody = UserSigninSchema.safeParse(recivedBody);
        
        if(!paresedBody.success) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const body: UserSigninType = paresedBody.data;

        const user = await prisma.user.findUnique({
            where: {
                username: body.username
            }
        });

        if(!user) {
            res.status(404).json({
                msg: null,
                data: null,
                error: "User Dose Not Exists"
            });
            return;
        }

        const comparePassword = await bcrypt.compare(body.password, user.password);

        if(!comparePassword) {
            res.status(403).json({
                msg: null,
                data: null,
                error: "Invalid Password"
            });
            return;
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            msg: "User Signed In",
            data: {
                username: user.username,
                token: token
            },
            error: null
        });
    } catch(err) {
        res.status(500).json({
            msg: null,
            data: null,
            error: "Internal Server Error"
        })
    }
});

export default router;