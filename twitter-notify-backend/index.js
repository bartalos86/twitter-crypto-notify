const express = require("express");
const axios = require("axios").default;
var Twit = require('twit')
var cors = require('cors')
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cors());

var T = new Twit({
    consumer_key:         process.env.TWITTER_API,
    consumer_secret:      process.env.TWITTER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_SECRET,
    timeout_ms:           60*1000,  
    strictSSL:            true, 
})

const accountFollows = ["binance", "elonmusk", "CoinMarketCap", "ShibaSwap", "dogecoin", "Shibtoken", "coinbase", "CoinbasePro"]
  
function generateFollowsQuery(followAccounts) {
    let query = "(";
    for (let i = 0; i < followAccounts.length; i++){
        let account = followAccounts[i];

        if (i != followAccounts.length - 1) {
            query += "from:" + account + " OR ";
        } else {
            query += "from:" + account + ")"
        }

    }

    console.log(query)

    return query;
}

app.get("/coins/:coins", (req, res) => {

    let coins = !req.params.coins ? "SHIB,DOGE,ADA" : req.params.coins;


    axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_API}&convert=EUR&per-page=${coins.split(',').length}&page=1&interval=1h,1d,7d&ids=${coins}`).then((response) => {

        if (response.status == 200) {

            let datas = response.data;
            let priceData = [];
    

            for (let i = 0; i < datas.length; i++) {
                let data = datas[i];
                priceData[i] = new Object();
            
                priceData[i].name = data.name;
                priceData[i].icon = data.logo_url;
                priceData[i].price = data.price;
                
                priceData[i].change1h = (data["1h"].market_cap_change_pct * 100).toFixed(2);
                priceData[i].change1d = (data["1d"].market_cap_change_pct * 100).toFixed(2);
                priceData[i].change7d = (data["7d"].market_cap_change_pct * 100).toFixed(2);


            }


            res.send(priceData).status(200);

        }
    });

});

app.get("/news", (req, res) => {

    let tweets = [];
    T.get('search/tweets', { q: `${generateFollowsQuery(accountFollows)} since:2021-06-03 `, result_type: "mixed", count: 10 }, function(err, data, response) {
        //console.log(data)
        for (let i = 0; i < data.statuses.length; i++){
            let dt = data.statuses[i];

            let tweet = {profilePicture: dt.user.profile_image_url, user: dt.user.screen_name, text: dt.text, retweets: dt.retweet_count, favourites: dt.favorite_count};

            if(i == 0)
            console.log(dt)
            
            if (dt.entities.media) {
                tweet.imageContent = dt.entities.media[0].media_url;
            }
            tweet.hashtags = dt.entities.hashtags;
            tweet.mentions = dt.entities.user_mentions;

            tweets.push(tweet);
           // console.log(`@${dt.user.screen_name}  ${dt.text} -- Retweets: ${dt.retweet_count}`);
        }

       
        res.setHeader("Access-Control-Allow-Origin","*")
        res.send(tweets).status(200);
    })

})
 


app.listen(3000, () => { console.log("server started") });