<template>
  <div v-show="haveAnyResult">
    <Navbar></Navbar>
  </div>
  <div v-show="searchTime">
    <form>
      <label>Plakayı giriniz:</label>
      <input type="text" name="plaka" v-model="searchText" maxlength="10" placeholder="00 AB 000">
      <label v-if="isAnyResult" class="error">Aradığınız plaka bulunamadı.</label>
    </form>
    <div class="user-list" v-show="isTableShow">
      <table class="table table-bordered">
        <tr>
          <th style="padding: 10px 50px;">S.NO</th>
          <th style="padding: 10px 100px;">Plaka</th>
          <th style="padding: 5px 10px;"></th>
        </tr>
        <tr v-for="(plate, index) in licensePlateLists" :key="(plate)">
          <td>{{ index + 1 }}</td>
          <td>{{ plate.plaka }}</td>
          <td><i class="fa-solid fa-arrow-right" @click="routeVehicle(plate.id)"></i></td>
        </tr>
      </table>
    </div>
  </div>
  <router-view :licensePlateId="licensePlateId"></router-view>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"
import axios from "axios";
import { ref, computed, watch } from "vue";

const baseUrl = "http://localhost/abs-mersin-edu-tr/api"

const licensePlateId = ref(0)
const haveAnyResult = ref(false);
const searchTime = ref(true);
const licensePlateLists = ref([])
const searchText = ref('')
const isTableShow = computed(() => {
  return searchText.value !== ''
})
const isAnyResult = computed(() => {
  return (licensePlateLists.value.length === 0 && searchText.value.length > 0)
})

function routeVehicle(id) {
  haveAnyResult.value = true
  searchTime.value = false
  licensePlateId.value = id
}

const getPlates = async() => {
  try {
    const res = await axios.post(baseUrl + '/arac_ara.php', {
    request: 'Plaka_Getir',
    licensePlate: searchText.value
    })
    licensePlateLists.value = res.data
  }
  catch(err) {
    console.log(err)
  }
}

watch(searchText,getPlates)
</script>

<style scoped>
  form{
    max-width: 400px;
    margin: 75px auto;
    background: white;
    text-align: left;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.337);
  }
  label{
    color: #888;
    display: inline-block;
    margin: 15px 0 15px;
    font-size: 0.85em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    font-size: 0.9em;
    color: #555;
  }
  h2 {
    text-align: center;
    margin-top: -10px;
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
  .submit {
    text-align: center;
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
  .error{
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>