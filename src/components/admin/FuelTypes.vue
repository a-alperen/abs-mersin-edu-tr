<template>
  <form @submit.prevent="Submit()">
    <h2>Yakıt Türü Kayıt</h2>
    <label>Yakıt Türü</label>
    <input type="text" v-model="fuelName" required>
    <div class="submit">
      <button>Bilgileri Kaydet</button>
    </div>
  </form>
  <div class="user-list">
    <table class="table table-bordered">
      <tr>
        <th style="padding: 5px 10px;">S.NO</th>
        <th style="padding: 10px 100px;">Yakıt Türü</th>
        <th style="padding: 5px 20px;"></th>
        <th style="padding: 5px 20px;"></th>
      </tr>
      <tr v-for="(fuel, index) in fuels" :key="(fuel)">
        <td>{{ index + 1 }}</td>
        <td>{{ fuel.yakit }}</td>
        <td style="padding: 5px 0px;"><i class="fa-solid fa-arrow-right" @click="updateFuelType(fuel)"></i></td>
        <td style="padding: 5px 10px;"><i class="fa-solid fa-xmark" @click="deleteFuelType(fuel)"></i></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import getFuelTypes from '@/composables/getFuelTypes';
import axios from 'axios';
import { ref } from "vue"

const url = 'http://localhost/abs-mersin-edu-tr/api/yakit_turleri.php'

const { fuels, loadFuelTypes } = getFuelTypes()
loadFuelTypes(url, 'YakitTuru_Getir')

const id = ref(0)
const fuelName = ref('')

function deleteFuelType(Fuel) {
  const warning = confirm("'"+Fuel.yakit+"'"+" yakıt türünü silmek istediğinize emin misiniz?")
  if(warning) {
    axios.post(url, {
      request: 'YakitTuru_Sil',
      id: Fuel.id
    })
    .then((response) => {
      loadFuelTypes(url, 'YakitTuru_Getir')
      alert(response.data.message)
      clearField()
    })
    .catch((error) => console.log(error))
  }
}

function updateFuelType(Fuel) {
  id.value = Fuel.id
  fuelName.value = Fuel.yakit
}
function Submit() {
  axios.post(url, {
    request: 'YakitTuru_Kaydet',
    id: id.value,
    fuelName: fuelName.value,
  })
  .then((response) => {
    loadFuelTypes(url, 'YakitTuru_Getir')
    alert(response.data.message)
    clearField()
  })
  .catch((error) => console.log(error))
}
function clearField() {
  id.value = 0
  fuelName.value = ''
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
    margin: 25px 0 10px;
    font-size: 0.7em;
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
  }
  td {
    padding: 10px 0px;
  }
  i:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  .user-list {
    text-align: center;
    justify-content: center;
    display: flex;  
  }
</style>