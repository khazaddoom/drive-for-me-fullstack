import { NextApiRequest, NextApiResponse } from "next";
import { SUCCESS } from "./types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    res.status(200).json({ ...SUCCESS})
  }