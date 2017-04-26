/**Get the data from localhost:3000/stocks */
var listFTSE = JSON.parse('')

var weights = {"name": 0,   "symbol": 0,    "market_cap_group": 0,
               "ib_supersector": 3,         "icb_industry": 2}

                
function percent_diff(tranche1 : number, tranche2 : number) {
  /** Magic Number 35 as the 350 stocks have been divided into 35 tranches of
  10 each */
  return (Math.abs(tranche1 - tranche2)/35)
}


/** Takes a list of company symbols as the argument
    and gives 5 similar recommendations based on various attributes
    For eg: ["BARC", "HSBA"] should be passed if the graph currently shows the
    stocks for Barclays and HSBC. */
function getRecommendationsFTSE(listCurrCompanies){
  var listCurrCompaniesFull = listFTSE.filter(item => listCurrCompanies.indexOf(item.symbol) !== -1)
  var fltrlistFTSE = listFTSE.filter(item => listCurrCompanies.indexOf(item.symbol) === -1)
  
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
  var listResponse = []
  for (let i of listTopRes.slice(0,5)){
    listResponse.push({"name": i.name, "symbol": i.symbol})
  }
  return (listResponse)
}