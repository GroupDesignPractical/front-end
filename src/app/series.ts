export class Stock {
  name: string;
  symbol: string;
  UID: number;
  index: number;
  selected: boolean;
  hovered: boolean;
  color: string;  
}
export class Trend {
  name: string;
  UID: number;
  index: number;
  selected: boolean;
  hovered: boolean;
  color: string;
}
export class News {
  name: string;
  api_name: string;
  UID: number;
  index: number;
  selected: boolean;
  hovered: boolean;
  shape: number;
}
export class TrendData {
	data: number;
	subject: string;
	sentiment: number;
}
