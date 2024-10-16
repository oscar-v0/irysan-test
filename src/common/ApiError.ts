export type ApiErrorParams = {
  status: number;
  message?: string;
  data?: any;
};

export default class ApiError {
  static ifNull(value: any, params: ApiErrorParams) {
    if (value != null) return value;
    throw new ApiError(params);
  }

  public readonly message: string;
  public readonly status: number;
  public readonly data?: any;

  constructor(params: {status: number; message?: string; data?: any}) {
    this.message = params.message || `API error ${params.status}`;
    this.status = params.status;
    this.data = params.data;
  }
}
