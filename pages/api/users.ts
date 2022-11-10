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
      await prisma.user.findMany({
        
      })
      const user = await prisma.user.create({
        data: {
          namedetails: [{
            country_code,
            mobile_number,
            otp: Math.round(Math.random()*1000),
            created_on: Date.now()
          }]
        }
      })
      result = { data: {...user}}
      break;
    default:
      break;
  }

  res.status(200).json({ ...SUCCESS, ...result })
}

