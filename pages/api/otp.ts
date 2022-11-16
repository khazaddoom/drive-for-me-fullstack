// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SUCCESS } from './types'

type IUser = Omit<Prisma.userGetPayload<{}>, "namedetails">

type IPhoneDetails = {
    countryCode?: string,
    mobileNumber?: string,
    createdOn?: string,
    otp?: string
}

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

        // each time someone asks for an OTP
        // we go into the DB find if there is an entry for any user with these details
        // if found, add this entry
        // if not found then treat this as a new user
        // if found, it could still be that someone spamming others account
        // but still we intend to give the OTP out thats all.

        const allUsers: IUser[] = await prisma.user.findMany({
            select: {
                id: true,
                phonedetails: true
            }
        })

        const existingPhoneNumber = allUsers.find(({phonedetails}) => {
            const parsedJSON = phonedetails as IPhoneDetails[]
            const hasPhone = parsedJSON.find(phone => phone.mobileNumber == mobile_number && phone.countryCode == country_code)
            return hasPhone != undefined
        })

        if (existingPhoneNumber) {
            const parsedPhoneDetails = existingPhoneNumber.phonedetails as IPhoneDetails[]

            const updates = {
                countryCode: country_code,
                mobileNumber: mobile_number,
                createdOn: Date.now(),
                otp: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
            }

            await prisma.user.update({
                where: {
                    id: existingPhoneNumber.id
                },
                data: {
                    phonedetails: [...parsedPhoneDetails, {...updates}]
                }
            })
            result = {
                message: "Existing User!",
                data : {...updates}
            }
        } else {
            const newUser = await prisma.user.create({
                data: {
                    phonedetails: [{
                        countryCode: country_code,
                        mobileNumber: mobile_number,
                        createdOn: Date.now(),
                        otp: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
                    }]
                },
                select: {
                    id: true,
                    phonedetails: true
                }
            })
            result = {
                data: {...newUser}
            }
        }

        break;
    default:
        break;
  }
  res.status(200).json({ ...SUCCESS, ...result })
}