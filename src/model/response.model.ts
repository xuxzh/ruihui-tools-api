export interface IRhResponse {
  statusCode: number;
  success: boolean;
  message?: string;
  result: IDataResult;
}

export interface IDataResult {
  data: any;
  // 以下三个属性仅在查询结果中出现
  total?: number;
  size?: number;
  index?: number;
}
