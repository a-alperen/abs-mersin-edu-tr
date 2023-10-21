<template>
  <div class="user">
    <form name="frmkayit" @submit.prevent="handleSubmit">
      <h2>Kullanıcı Kayıt</h2>

      <input type="hidden" name="kaydet" value="E">
      <input type="hidden" name="id" v-model="id">
      <label>Kullanıcı Adı</label>
      <input type="text" name="kul_adi" v-model="username" required>
      <!-- <div v-if="usernameError" class="error">{{ usernameError }}</div> -->
      <label>Şifre</label>
      <input type="password" name="password" v-model="password" required>
      <label>Şifreyi Onayla</label>
      <input type="password" name="confirmPassword" v-model="confirmPassword" required>
      <div v-if="passwordCheck" class="error">Şifreler uyuşmuyor.</div>
      <label>Kullanan Kişinin Adı</label>
      <input type="text" name="kullanan" v-model="name" required>
      <label>Birimi Seçiniz</label>
      <select v-model="sectionId"  required>
        <option v-for="unit in units" :key="unit.id" :value="unit.id">{{ unit.adi }}</option>
      </select>
      <div class="submit">
          <button>Bilgileri Kaydet</button>
      </div>
    </form>
    <form>
      <label>Kullanıcı Ara</label>
      <input type="text" v-model="userSearchName" required >
    </form>
    <div class="user-list">
      <table class="table table-bordered">
        <tr>
          <th style="padding: 5px 10px;">S.NO</th>
          <th>Kullanıcı Adı</th>
          <th>Kullanan</th>
          <th>Birim</th>
          <th style="padding: 5px 10px;"></th>
          <th style="padding: 5px 10px;"></th>
        </tr>
        <tr v-for="(user, index) in searchingUsers" :key="(user)">
          <td>{{ index + 1 }}</td>
          <td>{{ user.kul_adi }}</td>
          <td>{{ user.kullanan }}</td>
          <td>{{ user.birimadi }}</td>
          <td style="padding: 5px 10px;"><i class="fa-solid fa-arrow-right" @click="updateUser(user)"></i></td>
          <td style="padding: 5px 0px;"><i class="fa-solid fa-xmark" @click="deleteUser(user.id)"></i></td>
        </tr>
      </table>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios'

import getUnits from '@/composables/getUnits'
import getUsers from '@/composables/getUsers'
import { computed, ref } from 'vue'

  const baseUrl = 'http://localhost/abs-mersin-edu-tr/api'
  const { units, loadUnits } = getUnits()
  const { users, loadUsers } = getUsers()

  const userSearchName = ref('')
  const id = ref(0)
  const username = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const name = ref('')
  const sectionId = ref(0)

  loadUnits(baseUrl + "/birim.php", 'Birim_Getir')
  loadUsers(baseUrl + "/tanim_user.php", 'Kullanici_Getir')
    
  const searchingUsers = computed(() => {
    return users.value.filter(user => user.kul_adi.toLowerCase().includes(userSearchName.value.toLowerCase()))
  })
  const passwordCheck = computed(() => {
    return ((password.value !== confirmPassword.value) && (password.value !== '' && confirmPassword.value !== ''))
  })

  function handleSubmit() {
    
    if(passwordCheck){
      axios.post('http://localhost/abs-mersin-edu-tr/api/tanim_user.php', {
        request: 'Kaydet',
        id: id.value,
        username: username.value,
        password: password.value,
        name: name.value,
        sectionId: sectionId.value
      })
      .then((response) => {
        alert(response.data.message)
        loadUsers(baseUrl + "/tanim_user.php", 'Kullanici_Getir')
        clearField()
      })
      .catch((error) => console.log(error))
    }
  }
  function updateUser(user) {
    id.value = user.id
    username.value = user.kul_adi
    password.value = user.sifre
    confirmPassword.value = user.sifre
    sectionId.value = user.birim_id
    name.value = user.kullanan
  }
  function deleteUser(id) {
    const warning = confirm("Kayıt silinsin mi?")
    if(warning) {
      axios.post('http://localhost/abs-mersin-edu-tr/api/tanim_user.php', {
        request: 'Sil',
        id: id,
      })
      .then((response) => {
        alert(response.data.message)
        loadUsers(baseUrl + "/tanim_user.php", 'Kullanici_Getir')
        clearField()
      })
      .catch((error) => console.log(error))
    }
  }
  function clearField() {
    id.value = 0
    username.value = ''
    password.value = ''
    confirmPassword.value = ''
    sectionId.value = 0
    name.value = ''
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
</style>