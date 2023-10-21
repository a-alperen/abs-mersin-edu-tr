<template>
  <form name="frmkayit" @submit.prevent="handleSubmit" >
      <h2>Sürücü Kayıt</h2>

      <input type="hidden" name="kaydet" value="E">
      <input type="hidden" name="id" v-model="id">
      <label>TC Kimlik No</label>
      <input type="text" name="kimlikno" maxlength="11" required v-model="nationId">
      <label>Adı</label>
      <input type="text" name="adi" required v-model="name">
      <label>Doğum Tarihi</label>
      <input type="date" name="dogum_tarihi" required v-model="birthDate">
      <label>Ehliyet</label>
      <select name="ehliyet" v-model="license">
        <option value selected>Seçiniz</option>
        <option value="A2">A2</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="G">G</option>
        <option value="H">H</option>
      </select>
      <label>Hesabın Olduğu Banka</label>
      <select name="banka" v-model="bankName">
        <option value selected>Seçiniz</option>
        <option value="Akbank">Akbank</option>
        <option value="İş Bankası">İş Bankası</option>
        <option value="Garanti Bankası">Garanti Bankası</option>
        <option value="Yapı Kredi">Yapı Kredi</option>
        <option value="Finansbank">Finansbank</option>
        <option value="HSBC">HSBC</option>
      </select>
      <label>Hesap No</label>
      <input type="text" name="hesap_no" v-model="iban">
      <label>Cep Telefonu</label>
      <input type="tel" name="cep_tel" maxlength="15" v-model="phoneNumber">
      <label>Ev Telefonu</label>
      <input type="tel" name="ev_tel" maxlength="15" v-model="homeNumber">
      <label>Bir Yakının Telefonu</label>
      <input type="text" name="yakin_tel" maxlength="15" v-model="kinPhoneNumber">
      <label>Adres</label>
      <textarea name="adres" cols="30" rows="2" v-model="address"></textarea>
      <label>Çalıştığı Birim</label>
      <select v-model="unitId">
        <option v-for="unit in units" :key="unit.id" :value="unit.id">{{ unit.adi }}</option>
      </select>
      <div class="submit">
          <button>Bilgileri Kaydet</button>
      </div>
    </form>
    <form>
      <label>Şoför Ara</label>
      <input type="text" v-model="driverSearchName" required >
    </form>
    <div class="user-list">
      <table class="table table-bordered">
        <tr>
          <th style="padding: 5px 10px;">S.NO</th>
          <th style="padding: 5px 35px;">Kimlik No</th>
          <th style="padding: 5px 100px;">Adı</th>
          <th style="padding: 10px 20px;">Ehliyet</th>
          <th style="padding: 5px 15px;"></th>
          <th style="padding: 5px 15px;"></th>
          <th style="padding: 5px 15px;"></th>
        </tr>
        <tr v-for="(driver, index) in searchingDrivers" :key="(driver)">
          <td>{{ index + 1 }}</td>
          <td>{{ driver.kimlikno }}</td>
          <td>{{ driver.adi }}</td>
          <td>{{ driver.ehliyet }}</td>
          <td style="padding: 5px 0px;"><i class="fa-solid fa-arrow-right" @click="updateDriver(driver)"></i></td>
          <td style="padding: 5px 0px;"><i class="fa-solid fa-xmark" @click="deleteDriver(driver.id, driver.adi)"></i></td>
          <td style="padding: 5px 0px;"><i class="fa-solid fa-arrow-right-from-bracket" @click="retireDriver(driver.id, driver.adi)"></i></td>
        </tr>
      </table>
    </div>
</template>

<script setup>
import getUnits from '@/composables/getUnits'
import getDrivers from '@/composables/getDrivers'
import axios from 'axios';

import { computed, ref } from 'vue'

  const baseUrl = 'http://localhost/abs-mersin-edu-tr/api'

  const { units, errorUnit, loadUnits } = getUnits()
  const { drivers, errorDriver, loadDrivers } = getDrivers()

  const driverSearchName = ref('')
  const id = ref(0)
  const nationId = ref('')
  const name = ref('')
  const birthDate = ref('')
  const license = ref('')
  const bankName = ref('')
  const iban = ref('')
  const phoneNumber = ref('')
  const homeNumber = ref('')
  const kinPhoneNumber = ref('')
  const address = ref('')
  const unitId = ref(0)

  loadUnits(baseUrl + "/birim.php", 'Birim_Getir')
  loadDrivers(baseUrl + "/sofor.php", 'Surucu_Getir')

  const searchingDrivers = computed(() => {
    return drivers.value.filter(driver => driver.adi.toLowerCase().includes(driverSearchName.value.toLowerCase()))
  })
  function retireDriver(id, adi) {
    const warning = confirm("'"+adi+"'"+" adlı kullanıcıyı görevden ayırmak istediğinize emin misiniz?");
    if(warning) {
      axios.post(driverUrl, {
        request: 'Surucu_Ayril',
        id: id
      })
      .then((response) => {
        alert(response.data.message)
        loadDrivers(driverUrl, 'Surucu_Getir')
      })
      .catch((error) => console.log(error))
    }
  }
  function deleteDriver(id, adi) {
    const warning = confirm("'"+adi+"'"+" adlı şoförü silmek istediğinize emin misiniz?");
    if(warning) {
      axios.post(driverUrl, {
        request: 'Surucu_Sil',
        id: id
      })
      .then((response) => {
        alert(response.data.message)
        loadDrivers(driverUrl, 'Surucu_Getir')
      })
      .catch((error) => console.log(error))
      }
  }
  function updateDriver(driver) {
    id.value = driver.id
    nationId.value = driver.kimlikno
    name.value = driver.adi
    birthDate.value = driver.dogum_tarihi
    license.value = driver.ehliyet
    bankName.value = driver.banka
    iban.value = driver.hesap_no
    phoneNumber.value = driver.cep_tel
    homeNumber.value = driver.ev_tel
    kinPhoneNumber.value = driver.yakin_tel
    address.value = driver.adres
    unitId.value = driver.birim_id
  }
  function handleSubmit() {
    axios.post('http://localhost/abs-mersin-edu-tr/api/sofor.php', {
        request: 'Surucu_Kaydet',
        id: id.value,
        nationId: nationId.value,
        name: name.value,
        birthDate: birthDate.value,
        license: license.value,
        bankName: bankName.value,
        iban: iban.value,
        phoneNumber: phoneNumber.value,
        homeNumber: homeNumber.value,
        kinPhoneNumber: kinPhoneNumber.value,
        address: address.value,
        unitId: unitId.value

      })
      .then((response) => {
        alert(response.data.message)
        loadDrivers(driverUrl, 'Surucu_Getir')
        clearField()
      })
      .catch((error) => console.log(error))
  }
  function clearField() {
    id.value = 0
    nationId.value = ''
    name.value = ''
    birthDate.value = ''
    license.value = ''
    bankName.value = ''
    iban.value = ''
    phoneNumber.value = ''
    homeNumber.value = ''
    kinPhoneNumber.value = ''
    address.value = ''
    unitId.value = 0
  }
</script>

<style scoped>
  form{
    max-width: 500px;
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