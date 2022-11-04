let fullurl = ''
let data;
let stockvalues = new Map();
let stockdata

document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Please input a stock ticker")
    }

    else{
        ticker = document.querySelector('#newtask input').value
        ticker = ticker.toLowerCase()
        fullurl = `/avapi?symbol=${ticker}`
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
    
    
    

