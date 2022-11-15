export interface IResponse<T> {
    message: string,
    data: T | T[] | {}
}

export const SUCCESS: IResponse<string> = {
    message: "Success",
    data: {}
}
