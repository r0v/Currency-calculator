<template>
  <section class="search">
    <h1 class="title">{{ msg }}</h1>
    <img class="sva" src="./../../public/arrow_up.svg" alt="Arrow Up">
    <b-field position="is-centered" expanded>
      <p class="control">
        <span class="button is-static">PLN</span>
      </p>
      <b-input
        oninput="this.value = Math.abs(this.value)"
        type="number"
        @input="onChange"
        v-model.lazy="old_price"
        min="0"
        placeholder="0,00"
      ></b-input>
      <!-- <div v-if="errors.length">
        <span :key="errors.indexOf(error)" v-for="error in errors">{{ error }}</span>
      </div>-->

      <b-select @input="onChange" v-model.lazy="selected">
        <option v-for="current in currency" :key="currency.indexOf(current)">{{ current.code }}</option>
      </b-select>
    </b-field>
    <img class="sva" src="./../../public/arrow_down.svg" alt="Arrow Down">
    <div class="columns">
      <div
        class="column is-8-mobile is-offset-2-mobile is-6-tablet is-offset-3-tablet is-4-desktop is-offset-4-desktop is-2-fullhd is-offset-5-fullhd"
      >
        <div class="box is-flex sand">
          <h2 class="title is-5">Przewalutowanie:</h2>
          <div class="content tags has-addons">
            <span class="tag title is-5 is-link is-rounded">{{ old_price }} zł</span>
            <span class="tag title is-5 has-text-grey-dark is-1 is-white is-rounded">➡</span>
            <span class="tag title is-5 is-info is-rounded">{{ new_price }} {{symbol}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <div class="content">
          <p class="subtitle is-7">
            *Według średniego kursu NBP z dnia {{ last_update }}.
            <strong></strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";

export default {
  name: "Search",
  props: {
    msg: String
  },
  data: function() {
    return {
      old_price: 0,
      new_price: 0,
      selected: "USD",
      rates: [],
      currency: [],
      errors: [],
      symbol: "",
      last_update: ""
    };
  },
  methods: {
    onChange: async function() {
      let shortcut = this.selected;
      this.symbol = getSymbolFromCurrency(shortcut);

      const baseURL = `http://api.nbp.pl/api/exchangerates/rates/a/${shortcut}/?format=json`;
      await axios.get(baseURL).then(res => (this.rates = res.data));

      this.new_price = this.setTransfer(
        this.old_price,
        this.rates.rates[0].mid.toPrecision(4)
      );
    },
    setTransfer: function(price, rate) {
      let tmp = Math.abs(price) / rate;
      return tmp.toFixed(2);
    }
  },
  async mounted() {
    this.symbol = getSymbolFromCurrency(this.selected);

    if (
      localStorage.getItem("currency") === null &&
      localStorage.getItem("time") === null
    ) {
      try {
        let response = await axios.get(
          "http://api.nbp.pl/api/exchangerates/tables/a/?format=json"
        );

        // Time
        const time = response.data[0].effectiveDate
          .split("-")
          .reverse()
          .join("-");
        this.last_update = time;

        // Data
        const data = JSON.stringify(response.data[0].rates);
        this.currency = response.data[0].rates;

        localStorage.setItem("currency", data);
        localStorage.setItem("time", time);
      } catch (err) {
        this.errors.push(err);
      }
    } else {
      this.currency = JSON.parse(localStorage.getItem("currency"));
      this.last_update = localStorage.getItem("time");
    }
  }
};
</script>

<style scoped>
.sand {
  flex-direction: column;
  align-items: center;
}
.sva {
  height: 10rem;
}
.transfer {
  margin-top: 10rem;
}
svg {
  width: 100%;
}
</style>
