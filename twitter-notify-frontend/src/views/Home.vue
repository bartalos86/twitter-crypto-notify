<template>
  <div class="home">
    <div class="crypto-container">
      <crypto-card
        v-for="(item, index) in prices"
        :key="index"
        :coin="item"
      ></crypto-card>
    </div>

    <div class="tweet-container">
      <tweet v-for="(item, index) in tweets" :key="index" :tweet="item">
      </tweet>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CryptoCard from "@/components/CryptoCard.vue";
import axios from "axios";
import { ref } from "vue";
import Tweet from "../components/Tweet.vue";
export default {
  name: "Home",
  components: { CryptoCard, Tweet },
  setup() {
    let prices = ref({});
    let tweets = ref({});

    axios.get("http://localhost:3000/coins/SHIB,DOGE,ADA,LUNA").then((resp) => {
      if (resp.status == 200) {
        prices.value = resp.data;
        console.log(resp.data);
      }
    });

    axios.get("http://localhost:3000/news").then((resp) => {
      if (resp.status == 200) {
        tweets.value = resp.data;
        console.log(resp.data);
      }
    });

    return {
      prices,
      tweets,
    };
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb {
  background: teal;
  border-radius: 0px;
}

.large-title {
  font-size: 60px;
  text-align: center;
  margin: 25px;
  padding: 0;
  margin-top: 35px;
}

/* ################ Crypto part ################ */

.crypto-container {
  /* background-color: rgb(54, 51, 51); */
  display: flex;
  margin: auto;
  justify-content: center;
  scroll-behavior: auto;
  overflow: auto;
  flex-wrap: wrap;
}

/* ################ Twitter part ################ */

.tweet-container {
  width: 80%;
  max-width: 800px;
  margin: auto;
  padding: 50px;
  padding-top: 10px;
}

.tweet {
  background-color: teal;
  padding: 15px 30px;
  border-radius: 15px;
  margin-top: 25px;
}
</style>
