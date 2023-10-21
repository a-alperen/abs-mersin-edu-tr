<template>
  <form @submit.prevent="Submit()">
    <h2>Marka Kayıt</h2>
    <input type="hidden" name="id" v-model="id">
    <label>Marka Adı</label>
    <input type="text" v-model="brand" required>
    <label>Modeli</label>
    <input type="text" v-model="model" required>
    <div class="submit">
      <button>Bilgileri Kaydet</button>
    </div>
  </form>
  <form>
    <label>Marka-Model Ara</label>
    <input type="text" v-model="brandSearchName" required >
  </form>
  <div class="user-list">
    <table class="table table-bordered">
      <tr>
        <th style="padding: 5px 10px;">S.NO</th>
        <th style="padding: 10px 100px;">Marka</th>
        <th style="padding: 10px 100px;">Model</th>
        <th style="padding: 5px 20px;"></th>
        <th style="padding: 5px 20px;"></th>
      </tr>
      <tr v-for="(brand, index) in searchingBrands" :key="(brand)">
        <td>{{ index + 1 }}</td>
        <td>{{ brand.marka }}</td>
        <td>{{ brand.model }}</td>
        <td style="padding: 5px 0px;"><i class="fa-solid fa-arrow-right" @click="updateBrand(brand)"></i></td>
        <td style="padding: 5px 10px;"><i class="fa-solid fa-xmark" @click="deleteBrand(brand)"></i></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import getBrands from '@/composables/getBrands';
import axios from 'axios';
import { ref, computed } from "vue"

const url = 'http://localhost/abs-mersin-edu-tr/api/marka.php'

const { brands, loadBrands } = getBrands()
loadBrands(url, 'Marka_Getir')

const brandSearchName = ref('')
const id = ref(0)
const brand = ref('')
const model = ref('')

const searchingBrands = computed(() => {
    return brands.value.filter(brand => brand.marka.toLowerCase().includes(brandSearchName.value.toLowerCase()))
})
function deleteBrand(Brand) {
  const warning = confirm("'"+Brand.marka+"-"+Brand.model+"'"+" marka-model aracı silmek istediğinize emin misiniz?")
  if(warning) {
    axios.post(url, {
      request: 'Marka_Sil',
      id: Brand.id
    })
    .then((response) => {
      loadBrands(url, 'Marka_Getir')
      alert(response.data.message)
      clearField()
    })
    .catch((error) => console.log(error))
  }
}

function updateBrand(Brand) {
  id.value = Brand.id
  brand.value = Brand.marka
  model.value = Brand.model
}
function Submit() {
  axios.post(url, {
    request: 'Marka_Kaydet',
    id: id.value,
    brand: brand.value,
    model: model.value
  })
  .then((response) => {
    loadBrands(url, 'Marka_Getir')
    alert(response.data.message)
    clearField()
  })
  .catch((error) => console.log(error))
}
function clearField() {
  id.value = 0
  brand.value = ''
  model.value = ''
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