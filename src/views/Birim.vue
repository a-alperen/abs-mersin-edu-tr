<template>
  <SidebarMenu :menu="menu" :showOneChild="true" @update:collapsed="toggleSidebar" />
  <div class="birim" :style="{'transition': 'all 0.33s ease', 'margin-left': sidebarWidth }">
    <router-view />
  </div>
</template>

<script>
import { sidebarWidth, toggleSidebar } from '../components/sidebar_old/state';

import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

export default {
    name: 'birim1',
    components: { SidebarMenu },

    data() {
        return {
            menu: [
                {
                    header: 'Araç Bilgi Sistemi',
                    hiddenOnCollapse: true
                },
                {
                    href: '/birim/arac_ara',
                    title: 'Araç Bilgileri',
                    icon: 'fa-solid fa-magnifying-glass'
                },
                {
                    href: '/birim/sifre_degistir',
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
    }
}
</script>

<style>

</style>