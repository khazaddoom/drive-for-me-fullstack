export interface IResponse<T> {
    message: string,
    data: T | T[] | null
}

export const SUCCESS: IResponse<string> = {
    message: "Success",
    data: null
}
