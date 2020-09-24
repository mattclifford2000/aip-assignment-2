export interface Request {
  RequestId: number;
  //Foreign key, represents owner of the request
  OwnerID: number;
  RequestContent: string;
  RequestCompletion: boolean;
}
