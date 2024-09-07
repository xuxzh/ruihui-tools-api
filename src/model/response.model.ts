export interface IRhResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  result: IDataResult<T>;
}

export interface IDataResult<T> {
  data: T;
  // 以下三个属性仅在查询结果中出现
  total?: number;
  size?: number;
  index?: number;
}
