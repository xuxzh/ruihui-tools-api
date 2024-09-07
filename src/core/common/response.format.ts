import { IRhResponse } from '@model';

export function responseFormat<T>(
  data: T,
  option?: Pick<IRhResponse<T>, 'message'>,
): IRhResponse<T> {
  return {
    statusCode: 200,
    success: true,
    message: option?.message || '',
    result: {
      data,
    },
  };
}
