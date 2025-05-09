import express, { Router } from "express";
import prisma from "../lib/prisma.js";
import { ItemSchema, ItemType } from "../types/types.js";
import authMiddleware from "../middleware.ts/middleware.js";

const router = Router();

router.use(express.json());
router.use(authMiddleware);

router.get('/:habitId/', async (req, res) => {
    try {
        const { habitId } = req.params;
        if(!habitId) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const items = await prisma.item.findMany({
            where: {
                habitId: habitId
            },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true
            }
        });

        res.status(200).json({
            msg: "Fetched Items",
            data: items,
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

router.get('/:habitId/:itemId', async (req, res) => {
    try {
        const { habitId, itemId } = req.params;
        if(!habitId || !itemId) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const item = await prisma.item.findUnique({
            where: {
                id: itemId,
                habitId: habitId
            },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
            }   
        });

        res.status(200).json({
            msg: "Fetched Item",
            data: item,
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

router.put('/:habitId/:itemId', async (req, res) => {
    try {
        const { habitId, itemId } = req.params;
        const paresedBody = ItemSchema.safeParse(req.body);

        if(!habitId || !itemId || !paresedBody.success) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const body: ItemType = paresedBody.data;

        const item = await prisma.item.update({
            where: {
                id: itemId,
                habitId: habitId
            }, 
            data: {
                name: body.name,
                description: body.description,
                createdAt: new Date()
            }
        });

        res.status(201).json({
            msg: "Updated Item",
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

router.delete('/:habitId/:itemId', async (req, res) => {
    try {
        const { habitId, itemId } = req.params;
        if(!habitId && !itemId) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const item = await prisma.item.delete({
            where: {
                id: itemId,
                habitId: habitId
            }
        });

        res.status(410).json({
            msg: "Item Deleted",
            data: {
                itemId: itemId
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

router.post('/:habitId', async (req, res) => {
    try {
        const { habitId } = req.params;
        const paresedBody = ItemSchema.safeParse(req.body);
        
        if(!habitId || !paresedBody.success) {
            res.status(400).json({
                msg: null,
                data: null,
                error: "Invalid Data Recived"
            });
            return;
        }

        const body: ItemType = paresedBody.data;

        const item = await prisma.item.create({
            data: {
                habitId: habitId,
                name: body.name,
                description: body.description,
            }
        });

        res.status(201).json({
            msg: "Item Created",
            data: {
                item: body
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