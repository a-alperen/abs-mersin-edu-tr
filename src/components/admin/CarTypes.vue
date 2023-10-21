<template>
  <form @submit.prevent="Submit()">
    <h2>Araç Tipi Kayıt</h2>
    <label>Araç Tipi</label>
    <input type="text" v-model="carType" required>
    <div class="submit">
      <button>Bilgileri Kaydet</button>
    </div>
  </form>
  <div class="user-list">
    <table class="table table-bordered">
      <tr>
        <th style="padding: 5px 10px;">S.NO</th>
        <th style="padding: 10px 150px;">Araç Tipi</th>
        <th style="padding: 5px 20px;"></th>
        <th style="padding: 5px 20px;"></th>
      </tr>
      <tr v-for="(car, index) in cars" :key="(car)">
        <td>{{ index + 1 }}</td>
        <td>{{ car.tip }}</td>
        <td style="padding: 5px 0px;"><i class="fa-solid fa-arrow-right" @click="updateCarType(car)"></i></td>
        <td style="padding: 5px 10px;"><i class="fa-solid fa-xmark" @click="deleteCarType(car)"></i></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import getCarTypes from '@/composables/getCarTypes';
import axios from 'axios';
import { ref } from "vue"

const url = 'http://localhost/abs-mersin-edu-tr/api/arac_tipleri.php'

const { cars, errorCarTypes, loadCarTypes } = getCarTypes()
loadCarTypes(url, 'AracTipi_Getir')

const id = ref(0)
const carType = ref('')

function deleteCarType(Car) {
  const warning = confirm("'"+Car.tip+"'"+" araç tipini silmek istediğinize emin misiniz?")
  if(warning) {
    axios.post(url, {
      request: 'AracTipi_Sil',
      id: Car.id
    })
    .then((response) => {
      loadCarTypes(url, 'AracTipi_Getir')
      alert(response.data.message)
      clearField()
    })
    .catch((error) => console.log(error))
  }
}

function updateCarType(Car) {
  id.value = Car.id
  carType.value = Car.tip
}
function Submit() {
  axios.post(url, {
    request: 'AracTipi_Kaydet',
    id: id.value,
    carType: carType.value,
  })
  .then((response) => {
    loadCarTypes(url, 'AracTipi_Getir')
    alert(response.data.message)
    clearField()
  })
  .catch((error) => console.log(error))
}
function clearField() {
  id.value = 0
  carType.value = ''
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