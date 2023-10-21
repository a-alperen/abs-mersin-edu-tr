<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h2 style="text-align: center;">
      <span v-if="collapsed">
        <div>A</div>
        <div>B</div>
        <div>S</div>
      </span>
      <span v-else>Araç Bilgi Sistemi</span>
    </h2>

    <SidebarLink to="/admin" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/admin/faaliyetRaporu" icon="fas fa-columns">Faaliyet Raporu</SidebarLink>
    <SidebarLink to="/admin/tanim_user" icon="fas fa-users">Kullanıcı Tanımlama</SidebarLink>
    <SidebarLink to="/admin/birimler" icon="fas fa-chart-bar">Birimler</SidebarLink>
    <SidebarLink to="/admin/arac_ara" icon="fas fa-image">Araç Ara</SidebarLink>
    <SidebarLink to="" icon="fa-solid fa-car"></SidebarLink>

    <span class="collapse-icon" :class="{ 'rotate-180':collapsed }" @click="toggleSidebar">
      <i class="fas fa-angle-double-left"></i>
    </span>
  </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import SidebarLink from './SidebarLink_Old.vue';

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>