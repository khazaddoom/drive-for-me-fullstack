import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IResponse, SUCCESS } from "../types";

interface ICity {
    id: string,
    name: string
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<IResponse<ICity>>) {
        const { query: { id }} = req
        const prisma = new PrismaClient();
        const cities = await prisma.city.findMany({
            where: {
                ctryid: id as string
            }
        })
        res.status(200).json({
            ...SUCCESS,
            data: [...cities]
        })
}