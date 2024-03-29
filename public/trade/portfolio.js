const labels = ['Score', 'Room for Improvement'];
var esg_score_map = new Map();
var stock_values = new Map();
var date = new Date(); date.setDate(date.getDate()-100); date = new Date(date)

//configuration for pie charts (Your Portfolio)
const env_config = {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Environment Score',
            backgroundColor: ['rgb(15, 144, 49)', 'rgb(186, 222, 186)'],
            data: [0, 1],
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
};
const soc_config = {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Social Score',
            backgroundColor: ['rgb(235, 76, 52)', 'rgb(235, 174, 164)'],
            data: [0, 1],
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
};
const gov_config = {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Governance Score',
            backgroundColor: ['rgb(60, 100, 210)', 'rgb(161, 179, 230)'],
            data: [0, 1],
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
};

//configuration for pie charts (Your Last Search)
const env_config_search = {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Environment Score',
            backgroundColor: ['rgb(15, 144, 49)', 'rgb(186, 222, 186)'],
            data: [0, 1],
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
};
const soc_config_search = {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Social Score',
            backgroundColor: ['rgb(235, 76, 52)', 'rgb(235, 174, 164)'],
            data: [0, 1],
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
};
const gov_config_search = {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Governance Score',
            backgroundColor: ['rgb(60, 100, 210)', 'rgb(161, 179, 230)'],
            data: [0, 1],
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
};
// configuration for "Your Portfolio" value line graph
const stock_config =  {
    type: 'line',
    data: {
        labels: [...Array(100).keys()],
        datasets: [{
            label: 'USD',
            data: [],
            fill: false
        }]
    },
    options: {
        elements: {
            point:{
                radius: 0
            }
        },
        backgroundColor: 'rgba(15, 144, 49, .9)',
        borderColor: 'rgba(15, 144, 49, .9)',
        plugins: {
            legend: {
                display: false
            },
            title: {
                text: 'Your Portfolio',
                display: true,
                font: {
                    size: 15
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '# of days since ' + date.toLocaleDateString(),
                    font: {
                        size: 15
                    }
                } 
            },
            y: {
                title: {
                    display: true,
                    text: 'USD',
                    font: {
                        size: 15
                    }
                }
            }
        }
    }
};
//configuration for "Your Last Search" value line graph
const single_stock_config =  {
    type: 'line',
    data: {
        labels: [...Array(100).keys()],
        datasets: [{
            label: 'USD',
            data: [],
            fill: false
        }]
    },
    options: {
        elements: {
            point:{
                radius: 0
            }
        },
        backgroundColor: 'rgba(40,40,40, .5)',
        borderColor: 'rgba(40,40,40,.5)',
        plugins: {
            legend: {
                display: false
            },
            title: {
                text: 'Your Last Search',
                display: true,
                font: {
                    size: 15
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '# of days since ' + date.toLocaleDateString(),
                    font: {
                        size: 15
                    }
                } 
            },
            y: {
                title: {
                    display: true,
                    text: 'USD',
                    font: {
                        size: 15
                    }
                }
            }
        }
    }
};

function get_esg_api_url(symbol) {
    return `/esgapi?q=${symbol}`;
}
function check_company(name) {
    return esg_score_map.has(name);
}
function make_company_esg_score(name, e, s, g) {
    return {
        name: name,
        e: e,
        s: s,
        g: g
    };
}
function add_company(esg_obj) {
    esg_score_map.set(esg_obj.name, esg_obj);
}
function get_company(name) {
    return esg_score_map.get(name);
}
function random_int(L, R) {
    return L + Math.floor(Math.random()*(R - L))
}
function round_to_two_decimals(number) {
    return Math.round(number * 100) / 100.0
}
function random_esg_obj(name) {
    return make_company_esg_score(name, random_int(0, 1000), random_int(0, 1000), random_int(0, 1000))
}
function is_int(str) {
    str = str.toString()
    for (let i = 0; i < str.length; i++) {
        if ('0' <= str[i] && str[i] <= '9') continue;
        else return false
    }
    return true
}
//adds a number of stocks to the table of stocks
function add_row_stock_list(name, share, price) {
    const total_value = round_to_two_decimals(price*share)
    var prev = document.getElementById("total_value").innerHTML
    document.getElementById("total_value").innerHTML = (prev*1.0 + total_value).toFixed(2)
    if (document.getElementById(name) != null) {
        var tds = document.getElementById(name).getElementsByTagName("td")
        tds[1].innerHTML = tds[1].innerHTML*1 + share*1
        tds[2].innerHTML = (tds[2].innerHTML*1.0 + total_value).toFixed(2)
        return;
    }
    var tbodyref = document.getElementById("stock_list").getElementsByTagName("tbody")[0]
    var new_row = tbodyref.insertRow()
    var cell1 = new_row.insertCell(), cell2 = new_row.insertCell(), cell3 = new_row.insertCell()
    new_row.id = name
    cell1.appendChild(document.createTextNode(name.toUpperCase()))
    cell2.appendChild(document.createTextNode(share))
    cell3.appendChild(document.createTextNode(total_value.toFixed(2)))
}

//add button functionality
document.getElementById("add_button").onclick = function(){
    let symbol = document.getElementById("symbol_input").value
    const share = document.getElementById("share_input").value
    if(symbol.length == 0 || share.length == 0){
        alert("Please input a stock symbol and a number of shares")
    }else if (!is_int(share)) {
        alert("Please input a valid number")
    }else{
        document.getElementById("symbol_input").value = "";
        document.getElementById("share_input").value = "";
        symbol = symbol.toLowerCase()
        $.ajax({
            url: `/avapi?symbol=${symbol}`,
            success: function(data) {
                let count = 0;
                $.each(data["Time Series (Daily)"], function(i,item) {
                    stock_values.set(i, item['5. adjusted close'])
                    stock_chart.data.datasets[0].data[99 - count] += round_to_two_decimals(share * item['5. adjusted close'])
                    single_stock_chart.data.datasets[0].data[99 - count] = item['5. adjusted close']
                    if (count == 99) {
                        add_row_stock_list(symbol, share, item['5. adjusted close'])
                    }
                    count += 1
                });   
                single_stock_chart.options.plugins.title.text = symbol.toUpperCase()
                single_stock_chart.update()
                stock_chart.update()    
            }
        });
        symbol.toUpperCase();
        if (check_company(symbol)) {
            add_stock_to_graph(get_company(symbol), share);
            search_stock_to_graph(get_company(symbol))
            return;
        }
        // Dummy function for testing
        // esg_obj = random_esg_obj(symbol)
        // add_company(esg_obj)
        // add_stock_to_graph(esg_obj, share)
        // search_stock_to_graph(esg_obj)

        // Actual Code to call API

        $(function(){
            $.ajax({
                url: get_esg_api_url(symbol),
                success: function(data) {
                    $.each(data, function(i, item){
                        esg_obj = make_company_esg_score(item.stock_symbol, item.environment_score, item.social_score, item.governance_score);
                     
                        add_company(esg_obj);
                        add_stock_to_graph(esg_obj, share);
                        search_stock_to_graph(esg_obj)
                    });
                }
            });
        });
    }
};
//search button functionality
document.getElementById("search_button").onclick = function(){
    let symbol = document.getElementById("symbol_input").value
    if(symbol.length == 0){
        alert("Please input a stock symbol")
    }else{
        document.getElementById("symbol_input").value = "";
        document.getElementById("share_input").value = "";
        symbol = symbol.toLowerCase()
        $.ajax({
            url: `/avapi?symbol=${symbol}`,
            success: function(data) {
                let count = 0;
                $.each(data["Time Series (Daily)"], function(i,item) {
                    single_stock_chart.data.datasets[0].data[99 - count] = item['5. adjusted close']
                    count += 1
                });   
                single_stock_chart.options.plugins.title.text = symbol.toUpperCase()
                single_stock_chart.update()    
            }
        });

        // Dummy function for testing
        // esg_obj = random_esg_obj(symbol)
        // add_company(esg_obj)
        // search_stock_to_graph(esg_obj)


        // Actual Code to call API

        $(function(){
            $.ajax({
                url: get_esg_api_url(symbol),
                success: function(data) {
                    $.each(data, function(i, item){
                        esg_obj = make_company_esg_score(item.stock_symbol, item.environment_score, item.social_score, item.governance_score);
                        
                        add_company(esg_obj);
                        search_stock_to_graph(esg_obj);
                    });
                }
            });
        });
    }
};

for (let index = 0; index < 100; index++) {
    stock_config.data.datasets[0].data.push(0)
    single_stock_config.data.datasets[0].data.push(0)
}


//fadeins
var pageTop = $(document).scrollTop();
var pageBottom = pageTop + $(window).height();
var tags = $(".tag");

for (var i = 0; i < tags.length; i++) {
  var tag = tags[i];
  if ($(tag).position().top < pageBottom) {
    $(tag).addClass("fadeBot");
    $(tag).removeClass("invis");
  }
}
$(document).on("scroll", function() {
var pageTop = $(document).scrollTop();
var pageBottom = pageTop + $(window).height();
var tags = $(".tag");

for (var i = 0; i < tags.length; i++) {
  var tag = tags[i];
  if ($(tag).position().top < pageBottom) {
    $(tag).addClass("fadeBot");
    $(tag).removeClass("invis");
  }
}
});

//initialization of all chart.js charts
const env_chart = new Chart(
    document.getElementById("env_chart"),
    env_config
);
const soc_chart = new Chart(
    document.getElementById("soc_chart"),
    soc_config
);
const gov_chart = new Chart(
    document.getElementById("gov_chart"),
    gov_config
);
const stock_chart = new Chart(
    document.getElementById("stock_chart"),
    stock_config
)
const single_stock_chart = new Chart(
    document.getElementById("single_stock_chart"),
    single_stock_config
)
const env_chart_search = new Chart(
    document.getElementById("env_chart_search"),
    env_config_search
);
const soc_chart_search = new Chart(
    document.getElementById("soc_chart_search"),
    soc_config_search
);
const gov_chart_search = new Chart(
    document.getElementById("gov_chart_search"),
    gov_config_search
);
//function called by add button
function add_stock_to_graph(esg_obj, share) {
    env_chart.data.datasets[0].data[0] += esg_obj.e*1*share;
    env_chart.data.datasets[0].data[1] += (100 - esg_obj.e*1)*share;
    soc_chart.data.datasets[0].data[0] += esg_obj.s*1*share;
    soc_chart.data.datasets[0].data[1] += (100 - esg_obj.s*1)*share;
    gov_chart.data.datasets[0].data[0] += esg_obj.g*1*share;
    gov_chart.data.datasets[0].data[1] += (100 - esg_obj.g*1)*share;
    env_chart.update();
    soc_chart.update();
    gov_chart.update();
}
//function called by search button
function search_stock_to_graph(esg_obj) {
    env_chart_search.data.datasets[0].data[0] = esg_obj.e*1;
    env_chart_search.data.datasets[0].data[1] = 100 - esg_obj.e*1;
    soc_chart_search.data.datasets[0].data[0] = esg_obj.s*1;
    soc_chart_search.data.datasets[0].data[1] = 100 - esg_obj.s*1;
    gov_chart_search.data.datasets[0].data[0] = esg_obj.g;
    gov_chart_search.data.datasets[0].data[1] = 100 - esg_obj.g*1;
    env_chart_search.update();
    soc_chart_search.update();
    gov_chart_search.update();
}