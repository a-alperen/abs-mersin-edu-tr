<template>
  <form @submit.prevent="changePassword()">
    <label>Kullanıcı Adınız: </label>
    <div class="username">
      <label>{{ username }}</label>
    </div>
    <br>
    <label>Yeni Şifreniz:</label>
    <input type="password" name="password" maxlength="30" v-model="password">
    <label>Şifre Tekrar:</label>
    <input type="password" name="confirmPassword" maxlength="30" v-model="confirmPassword">
    <div v-if="isError" class="error">
      <h6>Şifreler uyuşmuyor!</h6>
    </div>
    <div class="submit">
      <button>Şifreyi Güncelle</button>
    </div>
    
  </form>
</template>

<script setup>
import getUsername from '@/composables/getUsername'
import axios from 'axios'
import { computed, ref } from 'vue'

  const url = 'http://localhost/abs-mersin-edu-tr/api/sifre_degistir.php'
  const { username, errorUsername, loadUsername } = getUsername()
  const password = ref('')
  const confirmPassword = ref('')

  loadUsername(url, 'Kullanici_Getir')

  const isError = computed(() => {
    return password.value !== confirmPassword.value
  })
  
  function changePassword() {
    if(isError){
      axios.post(url, {
        request: 'Sifre_Degistir',
        id: localStorage.getItem('kid'),
        password: password.value
      })
      .then((response) => {
        password.value = ''
        confirmPassword.value = ''
        alert(response.data.message)
      })
      .catch((error) => console.log(error))
    }
  }
</script>

<style scoped>
  form{
    max-width: 400px;
    margin: 150px auto;
    background: white;
    text-align: left;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.337);
    justify-content: center;
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
  .username {
    text-align: center;
    margin-left: 25px;
    display: inline-block;
  }
  .username label {
    color: #077c51;
  }
  .submit {
    text-align: center;
  }
  .error {
    text-align: center;
  }
  .error h6 {
    color: red;
    margin-top: 10px;
    margin-bottom: -10px;
    float: left;
  }
</style>