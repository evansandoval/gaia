let url1 = "https://tf689y3hbj.execute-api.us-east-1.amazonaws.com/prod/authorization/search?q=";
let ticker = "TGT"
let url2 = "";
let fullurl = ''
let data;
let stockvalues = new Map();
let avurl1 = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
let avurl2 = "";
let stockdata

document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Please input a stock ticker")
    }

    else{
        ticker = document.querySelector('#newtask input').value
        ticker = ticker.toLowerCase()
        fullurl = avurl1 + ticker + avurl2
        console.log(fullurl)
        //fullurl = "https://cors-anywhere.herokuapp.com/" + avurl1 + ticker + avurl2
        $.ajax({
            url: fullurl,
            success: function(data) {
                $.each(data["Time Series (Daily)"], function(i,item) {
                    stockvalues.set(i, item['4. close']);
                });        
            }
        });
        console.log(ticker);
        console.log(stockvalues);
    }
}

// $(function(){
//     $.ajax({
//         url: fullurl,
//         success: function(data) {
//             $.each(data, function(i,item) {
//                 console.log('Company Name: ' + item.company_name);
//                 console.log('Ticker: ' + item.exchange_symbol + ': '+ item.stock_symbol);
//                 console.log('Environment Score: ' + item.environment_grade + ", " + item.environment_score);
//                 console.log('Social Score: ' + item.social_grade + ", " + item.social_score);
//                 console.log('Goverance Score: ' + item.governance_grade + ", " + item.governance_score);
//                 e = item.environment_score
//                 s = item.social_score
//                 g = item.governance_score
//                 total = item.total
//             });        
//         }
//     });
// });
    
    
    

