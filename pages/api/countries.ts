import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IResponse, SUCCESS } from "./types";

interface ICountry {
    id: string,
    name: string
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<IResponse<ICountry>>) {
        const prisma = new PrismaClient();
        const countries = await prisma.country.findMany()
        res.status(200).json({
            ...SUCCESS,
            data: [...countries]
        })
}