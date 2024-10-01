export interface Response {
  status: number;
  message: string;
  error?: string;
  result?: any;
  success?: boolean;
}
