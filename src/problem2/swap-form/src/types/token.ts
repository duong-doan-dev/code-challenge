export enum TokenType {
  PAY = "pay",
  RECEIVE = "receive",
}

export interface TokenList {
  value: string;
  label: string;
  iconUrl: string;
}
