<template>
  <div class="sidebar close">
    <div class="logo-details">
        <i class="fa-solid fa-car"></i>
        <span class="logo_name">Araç Bilgi Sistemi</span>
    </div>
    <ul class="nav-links">
        <li>
            <div class="icon-link">
                <a href="#">
                    <i class="fa-solid fa-book"></i>
                    <span class="link_name">Tanımlamalar</span>
                </a>
                <i class="fa-solid fa-caret-down"></i>
            </div>
            <ul class="sub-menu">
                 <li><a class="link_name" href="#">Tanımlamalar</a></li>
                 <li><a href="/admin/tanim_user">Kullanıcı Tanımlama</a></li>
                 <li><a href="/admin/birimler">Birimler</a></li>
                 <li><a href="#">Şoför</a></li>
                 <li><a href="#">Marka-Model</a></li>
                 <li><a href="#">Araç Tipleri</a></li>
                 <li><a href="#">Yakıt Türleri</a></li>
                 <li><a href="#">Yakıt Fiyatları</a></li>
                 <li><a href="#">Araç</a></li>
            </ul> 
        </li>
        <li>
            <a href="/admin/arac_ara">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span class="link_name">Araç Bilgileri</span>
            </a>
            <ul class="sub-menu blank">
                 <li><a class="link_name" href="#">Araç Bilgileri</a></li>
            </ul>
        </li>
        <li>
            <a href="/admin/otobus_gecis_belirleme">
                <i class="fa-solid fa-user"></i>
                <span class="link_name">Personel Servis Hizmeti</span>
            </a>
            <ul class="sub-menu blank">
                 <li><a class="link_name" href="#">Tanımlamalar</a></li>
            </ul>
        </li>
        <li>
            <div class="icon-link">
                <a href="">
                    <i class="fa-solid fa-file-pen"></i>
                    <span class="link_name">Raporlama</span>
                </a>
                <i class="fa-solid fa-caret-down"></i>
            </div>
            <ul class="sub-menu">
                 <li><a class="link_name" href="#">Tanımlamalar</a></li>
                 <li><a href="#">Faaliyet Raporu</a></li>
                 <li><a href="#">Birimler</a></li>
                 <li><a href="#">Şoför</a></li>
            </ul>
        </li>
        <li>
            <a href="/admin/faaliyetRaporu">
                <i class="fa-solid fa-file-export"></i>
                <span class="link_name">Faaliyet Raporu</span>
            </a>
            <ul class="sub-menu blank">
                 <li><a class="link_name" href="#">Faaliyet Raporu</a></li>
            </ul>
        </li>
        <li>
            <a href="#">
                <i class="fa-solid fa-gear"></i>
                <span class="link_name">Ayarlar</span>
            </a>
            <ul class="sub-menu blank">
                 <li><a class="link_name" href="#">Ayarlar</a></li>
            </ul>
        </li>
        <li>
            <a href="#">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span class="link_name">Güvenli Çıkış</span>
            </a>
            <ul class="sub-menu blank">
                 <li><a class="link_name" href="#">Çıkış</a></li>
            </ul>
        </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 260px;
    background: #11101d;
}
.sidebar .logo-details {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.sidebar .logo-details i {
    font-size: 30px;
    color: #fff;
    height: 50px;
    min-width: 57px;
    text-align: center;
    line-height: 50px;
}
.sidebar .logo-details .logo_name {
    font-size: 22px;
    color: #fff;
    font-weight: 600;
}
.sidebar .nav-links {
    height: 100%;
    padding-top: 30px;
}
.sidebar .nav-links li {
    position: relative;
    list-style: none;
    transition: all 0.4s ease;
}
.sidebar .nav-links li:hover {
    background: #1d1b31;
}
.sidebar .nav-links li .icon-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.sidebar .nav-links li i {
    height: 50px;
    min-width: 57px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 20px;
}
.sidebar .nav-links li a {
    display: flex;
    align-items: center;
    text-decoration: none;
}
.sidebar .nav-links li a .link_name {
    font-size: 18px;
    font-weight: 400;
    color: #fff;
}
.sidebar .nav-links li .sub-menu {
    padding: 6px 6px 14px 65px;
    margin-top: -10px;
    background: #1d1b31;
    /* display: none; */
}
.sidebar .nav-links li .sub-menu a {
    color: #fff;
    font-size: 15px;
    padding: 5px 0;
    white-space: nowrap;
    opacity: 0.6;
    transition: all 0.3s ease;
}
.sidebar .nav-links li .sub-menu a:hover {
    opacity: 1;
}
.sidebar.close .nav-links li .sub-menu {
    position: absolute;
    left: 100%;
    top: -10px;
    margin-top: 0;
    padding: 10px 20px;
    border-radius: 0 6px 6px 0;
    transition: all 0.4s ease;
    opacity: 0;
    pointer-events: none;
}
.sidebar.close .nav-links li:hover .sub-menu {
    top: 0;
    opacity: 1;
    pointer-events: auto;
}
.sidebar .nav-links li .sub-menu .link_name {
    display: none;
}
.sidebar.close .nav-links li .sub-menu .link_name {
    font-size: 18px;
    opacity: 1;
    display: block;
}
.sidebar .nav-links li .sub-menu .blank {
    opacity: 1;
    pointer-events: auto;
    padding: 3px 20px 6px 16px;
}
.sidebar .nav-links li:hover .sub-menu .blank {
    top: 50%;
    transform: translateY(-50%);
}
</style>