import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IResponse, SUCCESS } from "../types";

interface ICity {
    id: string,
    name: string
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<IResponse<ICity>>) {
        const prisma = new PrismaClient();
        const cities = await prisma.city.findMany()
        res.status(200).json({
            ...SUCCESS,
            data: [...cities]
        })
}