<template>
  <form @submit.prevent="Submit()">
    <h2>Birim Kayıt</h2>
    <label>Birim Adı</label>
    <input type="text" v-model="unitName" required>
    <div class="submit">
      <button>Bilgileri Kaydet</button>
    </div>
  </form>
  <div class="user-list">
    <table class="table table-bordered">
      <tr>
        <th style="padding: 5px 10px;">S.NO</th>
        <th style="padding: 10px 175px;">Birim Adı</th>
        <th style="padding: 5px 20px;"></th>
        <th style="padding: 5px 20px;"></th>
      </tr>
      <tr v-for="(unit, index) in units" :key="(unit)">
        <td>{{ index + 1 }}</td>
        <td>{{ unit.adi }}</td>
        <td style="padding: 5px 0px;"><i class="fa-solid fa-arrow-right" @click="updateUnit(unit)"></i></td>
        <td style="padding: 5px 10px;"><i class="fa-solid fa-xmark" @click="deleteUnit(unit.id)"></i></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import getUnits from '@/composables/getUnits';
import axios from 'axios';
import { ref } from 'vue';

  const url = 'http://localhost/abs-mersin-edu-tr/api/birim.php'
  const { units, loadUnits } = getUnits()

  const unitName = ref('')
  const id = ref(0)
  loadUnits(url, 'Birim_Getir')

  function updateUnit(unit) {
    unitName.value = unit.adi
    id.value = unit.id
  }
  function deleteUnit(id) {
    const warning = confirm("Kayıt silinsin mi?")
    if(warning) {
      axios.post(url, {
        request: 'Birim_Sil',
        id: id,
      })
      .then((response) => {
        alert(response.data.message)
        loadUnits(url, 'Birim_Getir')
        clearField()
      })
      .catch((error) => console.log(error))
    }
    
  }
  function Submit() {
    axios.post(url, {
      request: 'Birim_Kaydet',
      id: id.value,
      unitName: unitName.value
    })
    .then((response) => {
      alert(response.data.message)
      loadUnits(url, 'Birim_Getir')
      clearField()
    })
    .catch((error) => console.log(error))
  }
  function clearField() {
    id.value = 0
    unitName.value = ''
  }

</script>

<style scoped>
  form{
    max-width: 400px;
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
    margin: 5px 0 10px;
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input, select{
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