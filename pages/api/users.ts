// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
  users: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient()
  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)

  res.status(200).json({ users: await prisma.users.findMany() })
}

