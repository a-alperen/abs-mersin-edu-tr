<template>
  <SidebarMenu :menu="menu" :showOneChild="true" @update:collapsed="toggleSidebar" />
  <div class="admin" :style="{'transition': 'all 0.33s ease', 'margin-left': sidebarWidth }">
    <router-view />
  </div>
</template>

<script>
import { sidebarWidth, toggleSidebar } from '@/components/sidebar_old/state';

import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

export default {
  name: 'admin',
  components: { SidebarMenu },
  data() {
    return {
      menu: [
          {
            header: 'Araç Bilgi Sistemi',
            hiddenOnCollapse: true
          },
          {
            href: '',
            title: 'Tanımlamalar',
            icon: 'fa fa-chart-area',
            child: [
              {
                href: '/admin/tanim_user',
                title: 'Kullanıcı Tanımlama'
              },
              {
                href: '/admin/birimler',
                title: 'Birimler'
              },
              {
                href: '/admin/sofor',
                title: 'Şoför'
              },
              {
                href: '/admin/marka',
                title: 'Marka-Model'
              },
              {
                href: '/admin/arac_tipleri',
                title: 'Araç Tipleri'
              },
              {
                href: '/admin/yakit_turleri',
                title: 'Yakıt Türleri'
              },
              {
                href: '/admin/yakit_fiyat',
                title: 'Yakıt Fiyatları'
              },
              {
                href: '/admin/arac',
                title: 'Araç'
              }
            ]
          },
          {
            href: '/admin/arac_ara',
            title: 'Araç Bilgileri',
            icon: 'fa-solid fa-magnifying-glass'
          },
          {
            href: '/admin/otobus_gecis_belirleme',
            title: 'Personel Servis Hizmeti',
            icon: 'fa-solid fa-user'
          },
          {
            href: '',
            title: 'Raporlama',
            icon: 'fa-solid fa-file-pen',
            child: [
              {
                href: '/admin/',
                title: 'Araç İstatistiği'
              },
              {
                href: '/admin/',
                title: 'Genel İstatistik'
              },
              {
                href: '/admin/',
                title: 'Görev İstatistik'
              },
              {
                href: '/admin/',
                title: 'Muayene-Trafik Sigortası'
              },
              {
                href: '/admin/',
                title: 'Yıllık Yakıt İstatistiği'
              },
              {
                href: '/admin/',
                title: 'Yağ İstatistiği'
              },
              {
                href: '/admin/',
                title: 'Depo İstatistiği'
              },
            ]
          },
          {
            href: '/admin/faaliyetRaporu',
            title: 'Faaliyet Raporu',
            icon: 'fa-solid fa-file-export'
          },
          {
            href: { name: 'sifreDegistirAdmin' },
            title: 'Şifre Değiştirme',
            icon: 'fa-solid fa-gear'
          },
          {
            href: '/',
            title: 'Güvenli Çıkış',
            icon: 'fa-solid fa-right-from-bracket'
          }
        ]
    }
  },
  setup() {
    return { sidebarWidth, toggleSidebar }
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>