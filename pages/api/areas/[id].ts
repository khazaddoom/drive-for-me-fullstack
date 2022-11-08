import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IResponse, SUCCESS } from "../types";

interface IArea {
    id: string,
    name: string
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<IResponse<IArea>>) {
        const { query: { id }} = req
        const prisma = new PrismaClient();
        const areas = await prisma.area.findMany({
            where: {
                ctyid: id as string
            }
        })
        res.status(200).json({
            ...SUCCESS,
            data: [...areas]
        })
}