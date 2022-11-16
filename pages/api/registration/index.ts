import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { SUCCESS, UNSUPPORTED_METHOD } from "../types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { method, body: { country_of_work, city_of_work, areas_of_work, fName, lName, country_code, mobile, email, my_work_hours } } = req
    let result = {}
    const prisma = new PrismaClient();
    switch (method) {
        case 'GET':
            result = {...UNSUPPORTED_METHOD}
            break;
        case 'POST':

            // Validation to be implemented

            const newUser = await prisma.user.create({
                data: {
                    namedetails: {
                        firstName: fName,
                        lameName: lName
                    },
                    phonedetails: {
                        countryCode: country_code,
                        mobileNumber: mobile
                    },
                    emailAddress: email,
                    myRole: { name: "DRIVER", countries: [country_code] },
                    stage: [{
                        "STAGE1" : { status: "InProgress", createdOn: Date.now() }
                    }],
                    myHours: [...my_work_hours],
                    myCountryOfWork: [country_of_work],
                    myCitiesOfWork: [city_of_work],
                    myAreasOfWork: [...areas_of_work],   
                }
            })
            

            result = {
                data: {
                    ...newUser
                }
            }
            break;
        default:
            break;
    }
    res.status(200).json({ ...SUCCESS })
}