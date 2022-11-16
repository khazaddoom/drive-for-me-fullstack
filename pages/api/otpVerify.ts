import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ONE_MINUTE } from "../../constants";
import { BAD_DETAILS, EXPIRED, IPhoneDetails, IUser, UNSUPPORTED_METHOD, VERIFIED } from "./types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    
    const { method, body: {country_code, mobile_number, otp} } = req;
    let result = {}
    const prisma = new PrismaClient();
    switch (method) {
      case 'GET':
        result = {...UNSUPPORTED_METHOD}
        break;
      case 'POST':
        const allUsers: IUser[] = await prisma.user.findMany({
            select: {
                id: true,
                phonedetails: true
            }
        })
        const foundPhone = allUsers.map(({phonedetails}) => {
          const parsedJSON = phonedetails as IPhoneDetails[]
          const hasPhone = parsedJSON.filter(phone => phone.mobileNumber == mobile_number && phone.countryCode == country_code && phone.otp == otp)
          return hasPhone[0]
        }).filter(item => item)

        if(foundPhone) {
          const details = foundPhone[0]
          const timeLeft = Date.now() - details.createdOn;
          if(timeLeft <= ONE_MINUTE) {
            result = {...VERIFIED}
          } else if(timeLeft > ONE_MINUTE) {
            result = {...EXPIRED}
          } else {
            result = {...BAD_DETAILS}
          }
        } else {
          result = {...BAD_DETAILS}
        }
        break;
      default:
        break;
    }
    res.status(200).json({...result})
}