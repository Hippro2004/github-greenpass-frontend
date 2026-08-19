export type ResponseObject<T> = {
  success: boolean;
  message: string;
  result: T;
};
