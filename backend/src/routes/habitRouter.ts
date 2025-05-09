import express, { Router } from "express";   
import authMiddleware from "../middleware.ts/middleware.js";
import { CustomRequest, HabitSchema, HabitType } from "../types/types.js";
import prisma from "../lib/prisma.js";

const router = Router();

router.use(express.json())
router.use(authMiddleware);

router.get('/', async (req: CustomRequest, res) => {
    try {
        const userId = req.userId;
        const recivedBody = req.body;
        console.log(recivedBody)
        const paresedBody = HabitSchema.safeParse(recivedBody);
        
        if(!paresedBody.success || !userId) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const body: HabitType = paresedBody.data;

        const habits = await prisma.habit.findMany({
            where: {
                userId: userId
            }, 
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                _count: {
                    select: { items: true}
                }
            }, 
            orderBy: {
                items: {
                    _count: 'desc'
                }
            }
        });

        res.status(200).json({
            msg: "Habits Fetched",
            data: {
                habits: habits
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

router.get('/:id', async (req, res) => {
    try {
        const habitId = req.params.id;
        if(!habitId) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const habit = await prisma.habit.findUnique({
            where: {
                id: habitId
            }, 
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                _count: {
                    select: { items: true}
                }
            }
        });

        if(!habit) {
            res.status(404).json({
                msg: null,
                data: null,
                error: "Habit Does Not Exists"
            });
            return;
        }

        res.status(200).json({
            msg: "Fetched Habit",
            data: habit,
            error: null
        })
    } catch(err) {
        res.status(500).json({
            msg: null,
            data: null,
            error: "Internal Server Error"
        }); 
    }
});

router.put('/:id', async (req, res) => {
    try {
        const habitId = req.params.id;
        const recivedBody = req.body;
        const paresedBody = HabitSchema.safeParse(recivedBody);
        
        if(!paresedBody.success || !habitId) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const body: HabitType = paresedBody.data;

        const habit = await prisma.habit.update({
            where: {
                id: habitId
            },
            data: {
                name: body.name,
                description: body.description,
                createdAt: new Date()
            }
        });

        res.status(201).json({
            msg: "Updated Habit",
            data: body,
            error: null
        })
    } catch(err) {
        res.status(500).json({
            msg: null,
            data: null,
            error: "Internal Server Error"
        }); 
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const habitId = req.params.id;
        if(!habitId) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const items = await prisma.item.deleteMany({
            where: {
                habitId: habitId
            }
        });

        const habit = await prisma.habit.delete({
            where: {
                id: habitId
            }
        });

        res.status(410).json({
            msg: "Habit Deleted",
            data: {
                habitId: habitId
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

router.post('/', async (req: CustomRequest, res) => {
    try {
        const recivedBody = req.body;
        const paresedBody = HabitSchema.safeParse(recivedBody);
        const userId = req.userId
        
        if(!paresedBody.success || !userId) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const body: HabitType = paresedBody.data;

        const habit = await prisma.habit.create({
            data: {
                userId: userId,
                name: body.name,
                description: body.description,
            }
        });

        res.status(201).json({
            msg: "Habit Created",
            data: {
                habit: body,
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

export default router;