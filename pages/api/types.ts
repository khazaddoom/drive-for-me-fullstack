import { Prisma } from "@prisma/client"

export interface IResponse<T> {
    message: string,
    data: T | T[] | {}
}

export const SUCCESS: IResponse<string> = {
    message: "Success",
    data: {}
}

export const UNSUPPORTED_METHOD: IResponse<string> = {
    message: "Method not supported!",
    data: {}
}

export const VERIFIED: IResponse<string> = {
    message: "Verfied",
    data: {}
}

export const EXPIRED: IResponse<string> = {
    message: "Expired!",
    data: {}
}

export const BAD_DETAILS: IResponse<string> = {
    message: "Bad OTP or Bad Number",
    data: {}
}

export type IUser = Omit<Prisma.userGetPayload<{}>, "namedetails">

export type IPhoneDetails = {
    countryCode: string,
    mobileNumber: string,
    createdOn: number,
    otp?: string
}