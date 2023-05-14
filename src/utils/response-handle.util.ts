export class ResponseHandler {
  public static response(data: any[], pageIndex: number, pageSize: number) {
    return { payload: data, pageIndex, pageSize, total: data.length };
  }
}
