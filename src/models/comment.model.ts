export interface IComment {
  id: number;
  content: string;
  timeStamp?: string;
  updated?: boolean;
  persistent: boolean;
}
