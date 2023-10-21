<template>
  <div class="login">
    <form @submit.prevent="checkLogin">
        <div class="imgcontainer">
            <img src="@/assets/logo_tr.png" alt="Mersin Üniversitesi" class="logo">
        </div>
        
        <div class="container">
            <h3>Mersin Üniversitesi Araç Bilgi Sistemi</h3><br>
            <input type="hidden" name="form_gonderildi" value="E">
            <label>Kullanıcı Adı</label>
            <input type="text" name="username" placeholder="Kullanıcı Adınızı Giriniz" v-model="userInfo.username" required>
            <label>Şifre</label>
            <input type="password" name="password" placeholder="Şifrenizi giriniz" v-model="userInfo.password" required>
            <button type="submit" name="save" value="login">Giriş Yap</button>
            
            <div v-if="isError" class="error">
            <h4>Kullanıcı adı veya şifre yanlış!</h4>
            </div>
        </div>
        
    </form>
  </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'
export default {
  setup() {
    localStorage.clear()
    console.log("local storage temizlendi.")
  },
  data() {
      return {
        isError: false,
        userInfo : {
            username:'',
            password:''
        }
      }
  },
  methods: {
    checkLogin() {
      axios.post('http://localhost/abs-mersin-edu-tr/api/login.php',{
        request: 'Giris_Yap',
        username: this.userInfo.username,
        password: this.userInfo.password
      }).then((response) => {
        const data = response.data
        localStorage.setItem('kid',data.kid)
        if (data.status == 1) {
          router.push({ name: 'admin' })
          localStorage.setItem('admin', 1)
        }
        else if(data.status == 0) {
          router.push({ name: 'birim' })
          localStorage.setItem('admin', 0)
        }
        else if(data.status == -1) {
          this.isError = true
        }
        else {
          console.log("something is wrong.")
        }
      })
      .catch((error) => console.log(error))
    },
  }
}
</script>

<style scoped>
  .login {
    display: block;
  }
  .login form {
    border: 1px solid #bfbfbf;
    border-radius: 10px;
    text-align: left;
    display: block;
    background: #efefef;
    width: 400px;
    margin: 50px auto;
  }
  .imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
    display: block;
  }
  img.logo {
    width: 60%;
  }
  .container {
    padding: 16px;
  }
  .container label {
    display: block;
    font-weight: bold;
    font-size: 16px;
  }
  .container h3 {
    color: #04AA6D;
    text-align: center;
  }
  input[type='text'], input[type='password'] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  button {
    color:white;
    background: #04AA6D;
    width: 100%;
    cursor: pointer;
    border: none;
    padding: 14px 20px;
    margin-top: 24px;
    margin-bottom: 12px;
    border-radius: 2px;
  }
  button:hover {
    background: #077c51;
  }
  .error {
    text-align: center;
  }
  .error h4 {
    color: red;
  }
</style>