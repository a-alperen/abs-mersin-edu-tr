<template>
  <form @submit.prevent="Submit()">
    <h2>Yakıt Fiyatı Kayıt Formu</h2>
    <input type="hidden" name="Year" v-model="Year">
    <input type="hidden" name="Month" v-model="Month">
    <label>Yıl</label>
    <select name="Year" v-model="year" required>
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>
    <label>Ay</label>
    <select name="month" v-model="month" required>
      <option v-for="(month, index ) in months" :key="(month)" :value="index">{{ month }}</option>
    </select>
    <label>Motorin Fiyatı</label>
    <input type="text" v-model="diesel" required>
    <div class="error">Küsüratı virgül ile giriniz.(Örn: 34,49)</div>
    <label>Benzin Fiyatı</label>
    <input type="text" v-model="gasoline" required>
    <div class="error">Küsüratı virgül ile giriniz.(Örn: 34,49)</div>
    <label>LPG Fiyatı</label>
    <input type="text" v-model="lpg" required>
    <div class="error">Küsüratı virgül ile giriniz.(Örn: 14,49)</div>
    <div class="submit">
      <button>Bilgileri Kaydet</button>
    </div>
  </form>
  <div class="user-list">
    <div class="inner">
      <span>Listelenecek Yıl:</span>
      <select name="listYear" v-model="searchYear" @change="handleChange">
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <table class="table table-bordered">
      <tr>
        <th>Yıl</th>
        <th>Ay</th>
        <th v-for="(fuel, index) in fuels" :key="index">{{ fuel.yakit }}</th>
        <th style="padding: 5px 10px;"></th>
        <th style="padding: 5px 10px;"></th>
        <th style="padding: 5px 10px;"></th>
      </tr>
      <tr v-for="cost in searchingCosts" :key="cost">
        <td>{{ cost.yil }}</td>
        <td>{{ months[cost.ay] }}</td>
        <td>{{ cost['9'] }}</td>
        <td>{{ cost['10'] }}</td>
        <td>{{ cost['13'] }}</td>
        <td><i class="fa-solid fa-calculator" @click="calculate(cost)"></i></td>
        <td><i class="fa-solid fa-arrow-right" @click="updateFuelCost(cost)"></i></td>
        <td><i class="fa-solid fa-xmark" @click="deleteFuelCost(cost)"></i></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import getFuelCosts from "@/composables/getFuelCosts"
import getFuelTypes from '@/composables/getFuelTypes';
import axios from "axios";
import { computed, ref } from "vue";

const currentYear = new Date().getFullYear()
const months = ['', 'OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK']
const years = ref([])
for (let i = 2011; i <= currentYear; i++) { years.value.push(i) }

const baseUrl = "http://localhost/abs-mersin-edu-tr/api"
const { costs, loadFuelCosts } = getFuelCosts()
const { fuels, loadFuelTypes } = getFuelTypes()
loadFuelTypes(baseUrl + "/yakit_turleri.php", 'YakitTuru_Getir')
loadFuelCosts(baseUrl + "/yakit_fiyat.php",'YakitFiyat_Getir')

const diesel = ref('')
const gasoline = ref('')
const lpg = ref('')
const year = ref(0)
const month = ref(0)
const Year = ref(0)
const Month = ref(0)

const searchYear = ref(0)

const searchingCosts = computed(() => {
  return costs.value.filter((cost) => cost.yil.includes(searchYear.value))
})
function calculate(cost) {
  axios.post(baseUrl + "/yakit_fiyat.php", {
    request: 'Hesapla',
    year: cost.yil,
    month: cost.ay,
  })
  .then((response) => {
    alert(response.data.message)
    clearField()
  })
  .catch((error) => console.log(error))
}
function deleteFuelCost(cost) {
  const warning = confirm("'"+cost.yil+" "+months[cost.ay]+ "' tarihindeki kaydı silmek istediğinize emin misiniz?")
  if(warning) {
    axios.post(baseUrl + "/yakit_fiyat.php", {
      request: 'Sil',
      year: cost.yil,
      month: cost.ay,
    })
    .then((response) => {
      loadFuelCosts(baseUrl + "/yakit_fiyat.php", 'YakitFiyat_Getir')
      alert(response.data.message)
      clearField()
    })
    .catch((error) => console.log(error))
  }
}
function Submit() {
  axios.post(baseUrl + "/yakit_fiyat.php", {
    request: 'Kaydet',
    Year: Year.value,
    Month: Month.value,
    year: year.value,
    month: month.value,
    diesel: diesel.value.replace(',','.'),
    gasoline: gasoline.value.replace(',','.'),
    lpg: lpg.value.replace(',','.')
  })
  .then((response) => {
    loadFuelCosts(baseUrl + "/yakit_fiyat.php", 'YakitFiyat_Getir')
    alert(response.data.message)
    clearField()
  })
  .catch((error) => console.log(error))
}
function updateFuelCost(cost) {
  diesel.value = cost['9'] ? cost['9'] : 0
  gasoline.value = cost['10'] ? cost['10'] : 0
  lpg.value = cost['13'] ? cost['13'] : 0
  year.value = cost.yil
  month.value = cost.ay
  Year.value = cost.yil
  Month.value = cost.ay
}
function clearField() {
  diesel.value = ""
  gasoline.value = ""
  lpg.value = ""
  year.value = 0
  month.value = 0
  Year.value = 0
  Month.value = 0
}
</script>

<style scoped>
  form{
    max-width: 450px;
    margin: 50px auto;
    background: white;
    text-align: left;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.181);
  }
  label{
    color: #aaa;
    display: inline-block;
    margin: 0px 0 5px;
    font-size: 0.75em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input, select, textarea{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  button{
    background: #077c51;
    border: 0;
    padding: 10px 50px;
    margin-top: 20px;
    color:white;
    border-radius: 20px;
    font-size: 1em;
  }
  button:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  .submit{
    text-align: center;
  }
  .error{
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
  h2{
    text-align: center;
    margin-top: -5px;
  }
  table {
    width: auto;
    margin: 0 auto;
  }
  td {
    padding: 10px 0px;
  }
  th {
    padding: 5px 35px;
  }
  i:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  .user-list {
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 100px;
  }
  .inner {
    white-space: nowrap;
    display: flex;
    align-items: center;
    float: left;
    position: absolute;
    left: 30%;
    top: -50px;
  }
  span {
    display: inline;
  }
</style>