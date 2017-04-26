import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { CompleteStock, Stock } from './stocks';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SeriesService {

  private trendsUrl = 'http://localhost:3000/stocks';

  constructor(private http: Http) {}
  
  /** Takes a list of company symbols as the argument
      and gives 5 similar recommendations based on various attributes
      For eg: ["BARC", "HSBA"] should be passed if the graph currently shows the
      stocks for Barclays and HSBC. */

  getRecommendationsFTSE(listCurrCompanies): Observable<Stock[]>{
    var res = this.http.get(this.trendsUrl)
               .map(this.extractData)
               .catch(this.handleError);
    var listFTSE = JSON.parse(res)
    var weights = {"name": 0,   "symbol": 0,    "market_cap_group": 0,
                   "ib_supersector": 3,         "icb_industry": 2}

    var fltrlistFTSE = listFTSE.filter(item => listCurrCompanies.indexOf(item.symbol) === -1)
    var listCurrCompaniesFull = listFTSE.filter(item => listCurrCompanies.indexOf(item.symbol) !== -1)
    
    /** Calculate the likelihood score */
    for (let i of fltrlistFTSE){
      var score = 0
      for (let j of listCurrCompaniesFull){
        var curr_score = 0
        for (let k in weights){
          curr_score = curr_score + (weights[k]*((j[k] == i[k]) ? 1:0))
        }
        score = score + (curr_score * (1 - percent_diff(
                                          i["market_cap_group"],
                                          j["market_cap_group"])
                                      )
                        )
      }
      i.score = score
    }
    
    var listTopRes = fltrlistFTSE.sort((n1, n2) => -(n1.score - n2.score))
    var listResponse: Stock[] = []
    
    for (let i of listTopRes.slice(0,5)){
      listResponse.push({"name": i.name, "symbol": i.symbol})
    }
    
    return (listResponse)
  }

  private extractData(res: Response) {
    alert(res.json());
    //return body.data || { };
  }

  private percent_diff(tranche1 : number, tranche2 : number) {
    /** Magic Number 35 as the 350 stocks have been divided into 35 tranches of
    10 each */
    return (Math.abs(tranche1 - tranche2)/35)
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}