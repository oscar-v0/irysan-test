export type ApiErrorParams = {
  status: number;
  message?: string;
  data?: any;
};

export default class ApiError {
  static notFoundIfNull = this.ifNull({status: 404, message: 'Not Found'});

  static ifNull<T>(params: ApiErrorParams) {
    return (value: T | null | undefined) => {
      if (value === null) {
        throw new ApiError(params);
      }

      return value;
    };
  }

  public readonly message: string;
  public readonly status: number;
  public readonly data?: any;

  constructor(params: {status: number; message?: string; data?: any}) {
    this.message = params.message || `API error ${params.status}`;
    this.status = params.status;
    this.data = {status: this.status, message: this.message};
  }
}
