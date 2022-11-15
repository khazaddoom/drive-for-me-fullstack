// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SUCCESS } from './types'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body: {country_code, mobile_number} } = req
  let result = {}
  const prisma = new PrismaClient();
  switch (method) {
    case 'GET':
      result = {}
      break;
    case 'POST':
      
      // TODO 
      // filter on JSON is not available for MongoDB
      // update this post API fixes from prisma client

      result = {}
      break;
    default:
      break;
  }

  res.status(200).json({ ...SUCCESS, ...result })
}

