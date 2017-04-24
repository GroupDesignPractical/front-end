import { Injectable } from '@angular/core';
import { Stock, Trend, News } from './series';
import { TRENDS } from './mock-trends';

@Injectable()
export class SeriesService {
  getTrends(): Promise<Trend[]> {
    return Promise.resolve(TRENDS);
  }
}


