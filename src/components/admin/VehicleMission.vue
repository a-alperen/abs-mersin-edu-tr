<template>
  <table class="table table-bordered" style="margin-top: 25px;">
    <tr>
      <th>Plaka</th>
      <th>Marka-Model</th>
      <th>Araç Türü</th>
      <th>Yakıt Türü</th>
    </tr>
    <tr>
      <td style="padding: 10px 20px;">33 RK 513</td>
      <td style="padding: 10px 20px;">OTOKAR SULTAN MAXİ 160S</td>
      <td style="padding: 10px 20px;">OTOBÜS</td>
      <td style="padding: 10px 20px;">MOTORİN</td>
    </tr>
  </table>
  <form @submit.prevent="Submit(licensePlateId)">
    <h2>Görev Kayıt Formu</h2>
    <label style="margin-bottom: 15px;">Görev Türü</label>
    <div class="wrapper">
      <label class="container">İç
        <input type="radio" v-model="taskType" checked="checked" name="radio" value="1">
        <span class="checkmark"></span>
      </label>
      <label class="container">Dış
        <input type="radio" v-model="taskType" name="radio" value="0">
        <span class="checkmark"></span>
      </label>
    </div>
    <label>Gittiği Yer</label>
    <input type="text" name="plaka" v-model="destination" required>
    <label>Yolcu</label>
    <input type="text" name="plaka" v-model="passenger" required>
    <label>Şoför</label>
    <select name="model" v-model="driverId" required>
      <option v-for="(driver) in drivers" :key="(driver)" :value="driver.id">{{ driver.adi }}</option>
    </select>
    <label>Yakıt Avans</label>
    <input type="text" name="plaka" v-model="fuelAdvance">
    <div class="wrapper">
      <div style="width: 45%;">
        <label>Gidiş Tarihi</label>
        <input type="date" v-model="departureDate">
      </div>
      <div style="width: 45%;">
        <label>Gidiş Saati</label>
        <input type="time" v-model="departureTime">
      </div>
    </div>
    <div class="wrapper">
      <div style="width: 45%;">
        <label>Dönüş Tarihi</label>
        <input type="date" v-model="returnDate">
      </div>
      <div style="width: 45%;">
        <label>Dönüş Saati</label>
        <input type="time" v-model="returnTime">
      </div>
    </div>
    <div class="wrapper">
      <div style="width: 45%;">
        <label>Çıkış KM</label>
        <input type="text" v-model="departureKilometers">
      </div>
      <div style="width: 45%;">
        <label>Giriş KM</label>
        <input type="text" v-model="returnKilometers">
      </div>
    </div>
    <div class="center">
      <button class="submit">Bilgileri Kaydet</button>
    </div>
  </form>
  <div class="user-list">
    <div class="outer">
      <div class="inner">
        <span>Listelenecek Yıl:</span>
        <select name="listYear" v-model="searchYear" @change="handleChange(licensePlateId)" style="width: auto;">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <div class="inner-button">
        <button class="excel" @click="ExportToExcel()">Tabloyu Excel'e aktar</button>
      </div>
    </div>
    <table class="table table-bordered" id="excelTable">
      <tr>
        <th style="padding: 10px 20px;">S.NO</th>
        <th style="padding: 10px 10px;">Görev Türü</th>
        <th style="padding: 10px 35px;">Gittiği Yer</th>
        <th style="padding: 10px 35px;">Yolcu</th>
        <th style="padding: 10px 20px;">Gidiş Tarihi</th>
        <th style="padding: 10px 20px;">Çıkış KM</th>
        <th style="padding: 10px 20px;">Giriş KM</th>
      </tr>
      <tr v-for="(mission, index) in missions" :key="(mission)">
        <td>{{ index + 1 }}</td>
        <td>{{ returnMissionTypeName(mission.gorev_turu) }}</td>
        <td>{{ mission.nereye }}</td>
        <td>{{ mission.kiminle }}</td>
        <td>{{ mission.gidis_tarihi }}</td>
        <td>{{ mission.cikis_km }}</td>
        <td>{{ mission.giris_km }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import getDrivers from "@/composables/getDrivers"
import getMissions from "@/composables/getMissions"
import { ref } from "vue"

const baseUrl = 'http://localhost/abs-mersin-edu-tr/api'
const props = defineProps({
  'licensePlateId': Number
})
const searchYear = ref(0)
const taskType = ref(1)
const destination = ref('')
const passenger = ref('')
const driverId = ref(0)
const fuelAdvance = ref('')
const departureDate =ref('')
const departureTime =ref('')
const returnDate = ref('')
const returnTime = ref('')
const departureKilometers = ref('')
const returnKilometers = ref('')

const years = ref([])
for (let i = 2018; i <= new Date().getFullYear(); i++) { years.value.push(i) }

const { drivers, loadDrivers } = getDrivers()
loadDrivers(baseUrl+"/sofor.php",'Surucu_Getir_Isim')
const { missions, loadMissions } = getMissions()

function ExportToExcel() {
  // Tabloyu Excel'e aktar
  const table = document.getElementById('excelTable');
        TableToExcel.convert(table, {
          name: 'AracGorev_'+searchYear.value+'.xlsx', // Excel dosyasının adı
          sheet: {
            name: 'Sheet 1', // Sayfa adı
          },
        });
}

function Submit(licensePlateId) {
  axios.post(baseUrl + "/arac_gorev.php", {
    request: 'AracGorev_Kaydet',
    id: licensePlateId,
    taskType: taskType.value,
    destination: destination.value,
    passenger: passenger.value,
    driverId: driverId.value,
    fuelAdvance: fuelAdvance.value,
    departureDate: departureDate.value,
    departureTime: departureTime.value,
    returnDate: returnDate.value,
    returnTime: returnTime.value,
    departureKilometers: departureKilometers.value,
    returnKilometers: returnKilometers.value
  })
  .then((response) => {
    loadMissions(baseUrl+"/arac_gorev.php","AracGorev_Getir", licensePlateId, searchYear.value)
    alert(response.data.message)
    clearField()
  })
  .catch((error) => console.log(error))
}

function handleChange(licensePlateId) {
  loadMissions(baseUrl+"/arac_gorev.php","AracGorev_Getir", licensePlateId, searchYear.value)
}
function returnMissionTypeName(id) {
  return (id == 1) ? 'İç' : 'Dış'
}
function clearField() {
  searchYear.value = 0
  taskType.value = 1
  destination.value = ''
  passenger.value = ''
  driverId.value = 0
  fuelAdvance.value = ''
  departureDate.value = ''
  departureTime.value = ''
  returnDate.value = ''
  returnTime.value = ''
  departureKilometers.value = ''
  returnKilometers.value = ''
}
</script>

<style scoped>
  form{
    max-width: 450px;
    margin: 25px auto;
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
  /* button{
    background: #077c51;
    border: 0;
    padding: 10px 50px;
    margin-top: 20px;
    color:white;
    border-radius: 20px;
    font-size: 1em;
  } */
  button:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  .submit{
    background: #077c51;
    border: 0;
    padding: 10px 50px;
    margin-top: 20px;
    color:white;
    border-radius: 20px;
    font-size: 1em;
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
  .center {
    text-align: center;
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
  }
  .excel {
    background: #084d8e;
    border: 0;
    padding: 5px 25px;
    color:white;
    border-radius: 20px;
    font-size: 1em;
  }
  .outer {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .inner {
    justify-content: flex-start;
    display: flex;
    align-items: center;
    width: auto;
    margin-left: 10%;
  }
  .inner-button {
    justify-content: center;
    display: flex;
    align-items: center;
    width: auto;
    margin-right: 10%;
  }
  span {
    display: inline;
    /* white-space: nowrap; */
  }
  /* The container */
  .container {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-transform: none;
    color: #2c3e50;
  }

  /* Hide the browser's default radio button */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the radio button is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #4f4f4f;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  .container .checkmark:after {
    top: 6.5px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }

</style>