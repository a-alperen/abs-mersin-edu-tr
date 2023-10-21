<template>
  <form @submit.prevent="Submit()">
    <h2>Araç Kayıt Formu</h2>
    <label>Plaka</label>
    <input type="text" name="license_plate" v-model="licensePlate" placeholder="Ör: 33 AB 333" required>
    <label>Marka-Model</label>
    <select name="model" v-model="model" required>
      <option v-for="(brand) in brands" :key="(brand)" :value="brand.id">{{ brand.marka }} {{ brand.model }}</option>
    </select>
    <label>Model Yılı</label>
    <input type="text" v-model="modelYear" placeholder="Ör: 2015" required>
    <label>Araç Tipi</label>
    <select name="model" v-model="modelType" required>
      <option v-for="(car) in cars" :key="(car)" :value="car.id">{{ car.tip }}</option>
    </select>
    <label>Yakıt Türü</label>
    <select name="model" v-model="fuelType" required>
      <option v-for="(fuel) in fuels" :key="(fuel)" :value="fuel.id">{{ fuel.yakit }}</option>
    </select>
    <label>Yakıt Depo Kapasitesi</label>
    <div class="depo">
      <input type="text" v-model="fuelTankCapacity" style="width: 40%;" placeholder="Örn: 100" required>
      <select name="model" v-model="sharedStorageId" style="width: 50%;">
        <option v-for="(storage) in sharedStorage" :key="(storage)" :value="storage.id">{{ storage.plaka }}</option>
      </select>
    </div>
    <label>Birinci Şoför</label>
    <select name="model" v-model="firstDriverId" required>
      <option v-for="(driver) in drivers" :key="(driver)" :value="driver.id">{{ driver.adi }}</option>
    </select>
    <label>İkinci Şoför</label>
    <select name="model" v-model="secondDriverId">
      <option v-for="(driver) in drivers" :key="(driver)" :value="driver.id">{{ driver.adi }}</option>
    </select>
    <label v-if="isSameDriver" class="error">Birinci ve ikinci şoför aynı kişi olamaz.</label>
    <label>Araç Hangi Birimde</label>
    <select name="model" v-model="vehicleUnitId" required>
      <option v-for="(unit) in units" :key="(unit)" :value="unit.id">{{ unit.adi }}</option>
    </select>
    <label>Aracın Görev Yeri</label>
    <select name="model" v-model="vehicleMissionUnitId" required>
      <option v-for="(unit) in units" :key="(unit)" :value="unit.id">{{ unit.adi }}</option>
    </select>
    <div class="submit">
      <button>Bilgileri Kaydet</button>
    </div>
  </form>
  <form>
    <label>Araç Ara</label>
    <input type="text" v-model="searchVehicle" placeholder="Ör: 33 AB 333" required >
  </form>
  <div class="user-list">
    <table class="table table-bordered">
      <tr>
        <th>S.NO</th>
        <th>Plaka</th>
        <th>Marka-Model</th>
        <th>Model Yılı</th>
        <th>Birim</th>
        <th style="padding: 5px 10px;"></th>
        <th style="padding: 5px 0px;"></th>
      </tr>
      <tr v-for="(vehicle, index) in searchingVehicles" :key="(vehicle)">
        <td>{{ index + 1 }}</td>
        <td>{{ vehicle.plaka }}</td>
        <td>{{ vehicle.marka }} {{ vehicle.model }}</td>
        <td>{{ vehicle.model_yili }}</td>
        <td>{{ vehicle.birim }}</td>
        <td><i class="fa-solid fa-arrow-right" @click="updateVehicle(vehicle.id)"></i></td>
        <td><i class="fa-solid fa-xmark" @click="deleteVehicle(vehicle.id)"></i></td>
      </tr>
    </table>
    </div>
</template>

<script setup>
import getVehicles from "@/composables/getVehicles"
import getUnits from "@/composables/getUnits"
import getDrivers from "@/composables/getDrivers"
import getFuelTypes from "@/composables/getFuelTypes"
import getCarTypes from "@/composables/getCarTypes"
import getBrands from '@/composables/getBrands'
import getSharedStorages from '@/composables/getSharedStorages'
import axios from "axios";
import { computed, ref } from "vue";

const baseUrl = 'http://localhost/abs-mersin-edu-tr/api'
const driverId = ref(0)
const licensePlate  = ref('')
const model = ref(0)
const modelYear = ref('')
const modelType = ref(0)
const fuelType = ref(0)
const fuelTankCapacity = ref('')
const sharedStorageId = ref(0)
const firstDriverId = ref(0)
const secondDriverId = ref(0)
const vehicleUnitId = ref(0)
const vehicleMissionUnitId = ref(0)

const { vehicles, loadVehicles } = getVehicles()
loadVehicles(baseUrl+"/arac.php",'Arac_Getir')
const { sharedStorage, loadSharedStorages } = getSharedStorages()
loadSharedStorages(baseUrl+"/arac.php",'OrtakDepo_Getir')
const { units, loadUnits } = getUnits()
loadUnits(baseUrl+"/birim.php",'Birim_Getir')
const { drivers, loadDrivers } = getDrivers()
loadDrivers(baseUrl+"/sofor.php",'Surucu_Getir_Isim')
const { fuels, loadFuelTypes } = getFuelTypes()
loadFuelTypes(baseUrl+"/yakit_turleri.php",'YakitTuru_Getir')
const { cars, loadCarTypes } = getCarTypes()
loadCarTypes(baseUrl+"/arac_tipleri.php",'AracTipi_Getir')
const { brands, loadBrands } = getBrands()
loadBrands(baseUrl+"/marka.php",'Marka_Getir')

const searchVehicle = ref('')
const searchingVehicles = computed(() => {
  return vehicles.value.filter((vehicle) => vehicle.plaka.toUpperCase().includes(searchVehicle.value.toUpperCase()))
})
const isSameDriver = computed(() => {
  return ((firstDriverId.value === secondDriverId.value) && !(firstDriverId.value === 0))
})
function Submit() {
  axios.post(baseUrl+"/arac.php", {
    request: 'Arac_Kaydet',
    id: driverId.value,
    licensePlate: licensePlate.value,
    model: model.value,
    modelYear: modelYear.value,
    modelType: modelType.value,
    fuelType: fuelType.value,
    fuelTankCapacity: fuelTankCapacity.value,
    sharedStorageId: sharedStorageId.value,
    firstDriverId: firstDriverId.value,
    secondDriverId: secondDriverId.value,
    vehicleUnitId: vehicleUnitId.value,
    vehicleMissionUnitId: vehicleMissionUnitId.value
  })
  .then((response) => {
    loadVehicles(baseUrl+"/arac.php", 'Arac_Getir')
    alert(response.data.message)
    clearField()
  })
  .catch((error) => console.log(error))
}
const updateVehicle = async(id) => {
  try {
    const res = await axios.post(baseUrl+"/arac.php", {
        request: 'TekArac_Getir',
        id: id
    })
    driverId.value = res.data.id
    licensePlate.value = res.data.plaka
    model.value = res.data.marka_id
    modelYear.value = res.data.model_yili
    modelType.value = res.data.tip_id
    fuelType.value = res.data.yakit_id
    fuelTankCapacity.value = res.data.yakit_depo_kapasitesi
    sharedStorageId.value = res.data.ortak_depo_id
    firstDriverId.value = res.data.sofor1_id
    secondDriverId.value = res.data.sofor2_id
    vehicleUnitId.value = res.data.birim_id
    vehicleMissionUnitId.value = res.data.gorev_yeri_birim_id
  }
  catch(err) {
    console.log(err)
  }
}
const deleteVehicle = async(id) => {
  const warning = confirm("Silmek istediğinize emin misiniz?");
  if(warning) {
    try {
      const res = await axios.post(baseUrl+"/arac.php", {
        request: 'Arac_Sil',
        id: id
      })
      alert(res.data.message)
      loadVehicles(baseUrl+"/arac.php", 'Arac_Getir')
    }
    catch(err) {
      console.log(err)
    }
  }
}
function clearField() {
  driverId.value = 0
  licensePlate.value = ''
  model.value = 0
  modelYear.value = ''
  modelType.value = 0
  fuelType.value = 0
  fuelTankCapacity.value = ''
  sharedStorageId.value = 0
  firstDriverId.value = 0
  secondDriverId.value = 0
  vehicleUnitId.value = 0
  vehicleMissionUnitId.value = 0
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
    margin-bottom: 5px;
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
  }
  span {
    display: inline;
  }
  .depo {
    display: flex;
    justify-content: space-between;
  }
</style>