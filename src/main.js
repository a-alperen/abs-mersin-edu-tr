import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import TableToExcel from "@linways/table-to-excel"
createApp(App).use(router, axios, TableToExcel).mount('#app')
