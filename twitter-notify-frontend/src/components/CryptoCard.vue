<template>
  <div class="crypto-card">
    <div class="header">
      <img class="icon" :src="coin.icon" height="55px" />
      <div class="card-sidebar">
        <h2 class="title">{{ coin.name }}</h2>
        <p class="price">{{ coin.price }} €</p>
      </div>
    </div>

    <hr />

    <div class="change-container">
      <p>
        1h:
        <span class="change" :class="[coin.change1h > 0 ? 'green' : 'red']">
          {{ coin.change1h }}%
        </span>
      </p>
      <p>
        1d:
        <span class="change" :class="[coin.change1d > 0 ? 'green' : 'red']">
          {{ coin.change1d }}%
        </span>
      </p>
      <p>
        7d:
        <span class="change" :class="[coin.change7d > 0 ? 'green' : 'red']">
          {{ coin.change7d }}%
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CryptoCard",
  props: {
    coin: Object,
  },
};
</script>

<style>
hr {
  width: 100%;
  color: rgba(148, 148, 148, 0.082);
  border-color: rgba(148, 148, 148, 0.082);
  border-width: 1px;
  background-color: rgba(148, 148, 148, 0.082);
  margin: 5px;
  margin-top: -5px;
}
.green {
  color: rgb(43, 214, 66);
}

.red {
  color: rgb(214, 43, 43);
}

.icon {
  height: 55px;
}

.crypto-card {
  background-color: #151a21;
  margin: 10px;
  padding: 7px 15px;
  border-radius: 15px;
  display: flex;
  position: relative;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.274) 2px 2px 6px;
}

.crypto-card:hover {
  box-shadow: rgba(0, 0, 0, 0.363) 2px 2px 10px;
}

.crypto-card .header {
  display: flex;
  position: relative;
}

.crypto-card .header .card-sidebar {
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 10px;
}

.crypto-card .icon {
  margin: 10px;
}

.crypto-card .title {
  font-size: 17px;
}

.crypto-card .price {
  margin-top: 7px;
  font-size: 15px;
  color: #f9a7b5;
  font-weight: 500;
}

.crypto-card .change-container {
  display: flex;
}

.change-container p {
  margin: 0 10px;
  font-weight: bold;
  font-size: 13px;
  white-space: nowrap;
}

.change-container .change {
  margin-left: 5px;
}
</style>
