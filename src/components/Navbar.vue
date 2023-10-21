<template>
    <div class="navbar">
        <router-link :to="{ name: 'aracGorev' + userType }" active-class="active">Görev</router-link>
        <router-link :to="{ name: 'aracBakim' + userType }" active-class="active">Bakım-Onarım</router-link>
        <router-link :to="{ name: 'aracCeza' + userType }" active-class="active">Ceza</router-link>
        <router-link :to="{ name: 'aracYakit' + userType }" active-class="active">Yakıt</router-link>
        <router-link :to="{ name: 'aracMuayene' + userType }" active-class="active">Muayene ve Trafik Sigortası</router-link>
        <router-link :to="{ name: 'aracLastik' + userType }" active-class="active">Lastik Bilgileri</router-link>
        <router-link :to="{ name: 'aracYag' + userType }" active-class="active">Yağ Bilgileri</router-link>
    </div>
</template>

<script setup>
const userType = (localStorage.getItem('admin') !== '1') ? 'Birim' : 'Admin'
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #2a2a2e;
    width: auto;
}
.navbar a {
    float: left;
    font-size: 16px;
    color: white;
    text-align: center;
    padding: 8px 20px;
    text-decoration: none;
    transition: 0.33s all ease;
}
.navbar > a:hover, .dropdown:hover .dropbtn {
    background-color: rgb(33, 33, 33);
    padding: 8px 30px;
    color: white;
    text-decoration: none;
    font-weight: bold;
}
.active {
    background-color: rgb(33, 33, 33);
    font-weight: bold;
    padding: 8px 30px;
}
/* .dropdown {
    float: left;
}
.dropdown .dropbtn {
    font-size: 16px;  
    border: none;
    outline: none;
    color: white;
    padding: 20px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
    cursor:pointer;
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}
.dropdown-content a {
    float: none;
    color: rgb(33, 33, 33);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}
.dropdown-content a:hover {
    background-color: #ddd;
} 
.dropdown:hover .dropdown-content {
    display: block;
} */

</style>