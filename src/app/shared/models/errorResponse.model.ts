export interface IErrorResponse {
  success: boolean,
  error: {
      code: number,
      type: string,
      info: string,   
  }
}