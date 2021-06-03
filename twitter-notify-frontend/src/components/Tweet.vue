<template>
  <div class="tweet" :class="{ 'tweet-reply': isReply }">
    <p class="date">{{ new Date(tweet.created).toLocaleString("hu") }}</p>

    <div class="head">
      <img class="profile" :src="tweet.profilePicture" />

      <div class="head-side">
        <p class="user">@{{ tweet.user }}</p>
        <p class="content">
          {{ tweet.text }}
        </p>
      </div>
    </div>

    <div class="foot">
      <div v-if="tweet.mentions" class="mentions">
        <p v-for="(item, index) in tweet.mentions" :key="index" class="mention">
          @{{ item.screen_name }}
        </p>
      </div>

      <div v-if="tweet.hashtags" class="hashtags">
        <p v-for="(item, index) in tweet.hashtags" :key="index" class="hashtag">
          #{{ item.text }}
        </p>
      </div>
    </div>

    <div class="indicators">
      <div class="indicator">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADDElEQVRoge2Yz0sUYRjHv8/smiLOukoR4k6rYAdBgi51WvKo0cVDBYvNKuHRIJHO/QFJYNfCdlfE6tKhWOm0YVCdIvAoKM56kAJ3d1Ra2Zmng46sOj922REXeT+nme/7PPs8X96XmZ0HEAgEAoFAcHEgrwDlbeEpAGhj7S8t7fKbP3JL8NJXAt08o752AawC+BxskmbX4m1bXgmuRpSk/hDghcPQuJaQ31lr0fRul2Ea3wmI1tezJzsgmtBUedEtyNFIZE4fJImXADQfSiU2aSg3LmetmGhK7zeZvwHo9KVlZxhEcTcztkaUlD4A5mUA4RNLeRDFNFVeOYpNF2Mw8QVAiy8tO7MTbJL6nI6ZdFLont+LgDmD0yYAIAzmTPf8XsQStEehZSJSAZi+tWxPW3nfmHRaPGakZ247LBnlDICIQzwARCSjnOmZ2z4yuqHKH8A8XX+vHhDdc1yyLvpmubkU1pfAGKzuR5FtzstDq0+o5EOLx4ikCreJ6cfpktA3EqGQXc7BjjDTfrv+umoTAMAYLLUXU3jOp45nveTU9p/2JSE75UgAoKT1GQZGay9JD5Te4qva8/zH8fGrJItsp2uJkOdL1A9qre/7sTgvhJFGQxhpNISRRkMYaTSEkUYjeN4NAICSLM4AmKoy9vh/MMaMNhaabogd0VR5moF07Zn8XluXnwHuR2vHTowkC7dqL+gBEbcU5AkQst7BVg6yzYWQiudkHtw6oCSLvwHcqL9LF5inKudlPXPbYUMKLAMY8MhcCZhGbH28I28Jbjvyqc42vSF6cS2l37du18c78mYgOAwg55KVMwPB4UoTgIuRYJM0C4fj5SMSM6eUdDFmCZujrTkQDQPI28TnQTS8Odp6yqijkbV42xaIJgDYfqn5SAtMfIym9H5L0FR5hU0aAVA52CixSSOVM7VKXJ9amiovgiiOs9+ZToM5E03vdlnCwUSTEjiYl5kAJSqnnCep6vu7d2HnannfmGTCXQJdB9BWd+s2MPjXv/L+nb+Pr+iWZjdEFwgEAoFAcNH5D2NY/qNgF7chAAAAAElFTkSuQmCC"
        />
        <p class="indicattor-text">{{ tweet.retweets }}</p>
      </div>

      <div class="indicator">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEBklEQVRoge2ZX2gcVRSHvzOzG9gqhQo2s1ur+FBqBaWQhpBkI2op2iS1QexTJUgVKwUf9EWhIkVEmgcpVCPF9kGMRbBa0uYPthIIyaahVQulakV9UFqTWGnVJiGS7M7xIdlkdrPZ7s5MdiLs93T27rnn/n5c7t2dM1CmTJkyZQJACk38/an6jUZKWhC2AeuA9UAYuIlwBVsHDZGTld2JS4XUu9ZYt9k0zadB4yibgLuAGeCqwjVBvkrZ2nlPb+InX4yMNNZvEYM2kMcLKQgk1Db2x3oHBnJ9Odocf1SUt1WoL7BenyqvxXoS3+ZLWtKIVlWFx6KRQ8C+fHlLTRflw5lVqVfWnxieAri6qzZiThmHBXmhyFoAiuj71nj4VenvT+ZKyCnwt6b4mgqDL1Aec7Gos/zwtGqTkUxJqMLsRanxVo++f0OhZ+7v7P970UrZA1pVFR6LRc54NzFXD84JIqC1ftQD+qyJ0JPZO2NkZ41FI4f8MgEgUOejCYCto3cm382xzgKzB1suZI+vQFSVaucFkLEjs7fTijcBIAgHMwfmGNlR+4CoeaX0mtyTstmY/p2Z3xEDsyU4Se4wDdmZjueN2MrWYOS4R1W3pWPnGbkvAC2eEOHedDxvRCAajBxPrEsHzh2pCECIV8LpwGnkVgBCvPJPOlgwIowGIsUDyoLmBSMqPwSixhvfpwOHEf06EClecGh23Fr2mWDUeMCwv5wP04HVc+47HFu14hEux7qGf0x/zPzTCEdLr8gdYkuG1sznkelVx4DrpRTkkj9N0/7IOZBhxDp7dlJFDrLi0bfuPj007hxZ9IQYHTffAy6WTFORKFyyJsJHsscXGZH+/qTYxnPAZEmUFceEofazuTopi4wAWL0Dl1W1FdBll1Y4iujzc7frInIaAYj1DJ1UaFs+XcUhyjvRrqHPlvp+SSMA0Uj0DUGO+y+raDoqqxNv5ku4baNBD2CMfRM/CuzxTVYRKHosumVorxzAzpdXUMdk1kxDO+hL/sgrmHarO/GyFHBWi2r9jDTFXxShHQi5llYYKZT90Z5EwWe06B7WSFPDEyL6KbCm2LkFckuE3VZXoruYSa6acdebH9mQQo+DVruZn4cLppHavfb08C/FTsx7ay3F2u6Bn60Jsw7ldYQZNzWySCK03Yz81eDGBPjQHh1rjNfYBh0CG1wVUP1VoTXWMzToRYerHXFi9SbOI1ObFQ67mN4RMnnYqwnwuWE9sqOhRVSPAJW3Sf1DRPZaXYOn/Frb8444iXUNdk4rm0T0kzxpn5OSh/w0Acv4CmG0Od4KfADcMTc0CeyLdic+Xo71lvVdyOjOhgdJ6gkAQrIremrw/9hymuXG9prVN7bXrA5aR5lS8x+ylzUGWX5EPwAAAABJRU5ErkJggg=="
        />
        <p class="indicattor-text">{{ tweet.favourites }}</p>
      </div>
    </div>

    <img
      class="image"
      v-if="tweet.imageContent"
      :src="tweet.imageContent"
      alt=""
    />

    <tweet
      v-if="tweet.quotedStatus"
      :tweet="tweet.quotedStatus"
      :isReply="true"
    ></tweet>

    <tweet
      v-if="tweet.retweetTo"
      :tweet="tweet.retweetTo"
      :isReply="true"
    ></tweet>
  </div>
</template>

<script>
export default {
  name: "Tweet",
  props: {
    tweet: Object,
    isReply: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.tweet {
  background-color: #2b3440;
  padding: 20px 30px;
  border-radius: 15px;
  margin-top: 25px;
  font-size: 15px;
  position: relative;
}

.tweet-reply {
  background: #1f252e;
}

.head {
  margin-top: 15px;
  align-items: flex-start;
}

.profile {
  width: 70px;
  height: 70px;
  border-radius: 100px;
  margin: auto;
}

.head-side {
  margin-left: 20px;
  width: 100%;
}

.user {
  font-size: 17px;
  margin-top: 5px;
  font-weight: 500;
}

.head,
.indicators {
  display: flex;
}

.indicators {
  margin: auto;
  margin-right: 15px;
  margin-left: auto;
  vertical-align: -webkit-baseline-middle;
  position: absolute;
  right: 10px;
  top: 20px;
}

.indicator {
  margin-right: 50px;
  display: flex;
  align-items: center;
}

.indicator > img {
  width: 25px;
  height: 25px;
  margin-right: 7px;
}

.foot {
  display: flex;
  margin-top: 10px;
}

.hashtags,
.mentions {
  display: flex;
}

.mention {
  color: #ffc83d;
  margin: 10px;
  font-size: 15px;
  font-weight: 400;
}
.hashtag {
  color: #1da1f2;
  font-weight: light;
  margin: 10px;
  font-size: 15px;
}

.image {
  width: 75%;
}

.content {
  margin-top: 12px;
  font-weight: 400;
}

.date {
  font-size: 12px;
  font-weight: 200;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>