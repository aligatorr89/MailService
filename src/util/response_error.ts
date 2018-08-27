export interface IResponseError {
    error: Error;
}

export const ResponseError = (error: Error): IResponseError => {
    return {
        error: error
    };
};
