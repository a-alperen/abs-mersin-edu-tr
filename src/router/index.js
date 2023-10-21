import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Birim from '../views/Birim.vue'

import UserRegistration from '@/components/admin/UserRegistration.vue'
import Units from '@/components/admin/Units.vue'
import ActivityReport from '@/components/admin/ActivityReport.vue'
import SearchCar from '@/components/admin/SearchCar.vue'
import PersonnelService from '@/components/admin/PersonnelService.vue'
import Driver from '@/components/admin/Driver.vue'
import Brand from '@/components/admin/Brand.vue'
import CarTypes from '@/components/admin/CarTypes.vue'
import FuelCosts from '@/components/admin/FuelCosts.vue'
import FuelTypes from '@/components/admin/FuelTypes.vue'
import Vehicle from '@/components/admin/Vehicle.vue'

import ChangePassword from '@/components/birim/ChangePassword.vue'
import VehicleMission from '@/components/admin/VehicleMission.vue'
import VehicleMaintenance from '@/components/admin/VehicleMaintenance.vue'
import VehicleCitation from '@/components/admin/VehicleCitation.vue'
import VehicleFuelUsage from '@/components/admin/VehicleFuelUsage.vue'
import VehicleInspection from '@/components/admin/VehicleInspection.vue'
import VehicleTireData from '@/components/admin/VehicleTireData.vue'
import VehicleOilInfo from '@/components/admin/VehicleOilInfo.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,

    children: [
      {
        path: '',
        name: 'admin',
        component: Admin
      },
      {
        path: '/admin/tanim_user',
        name: 'kullaniciTanimlama',
        component: UserRegistration
      },
      {
        path: '/admin/birimler',
        name: 'birimler',
        component: Units
      },
      {
        path: '/admin/sofor',
        name: 'sofor',
        component: Driver
      },
      {
        path: '/admin/marka',
        name: 'marka',
        component: Brand
      },
      {
        path: '/admin/arac_tipleri',
        name: 'aracTipleri',
        component: CarTypes
      },
      {
        path: '/admin/yakit_turleri',
        name: 'yakitTurleri',
        component: FuelTypes
      },
      {
        path: '/admin/yakit_fiyat',
        name: 'yakitFiyat',
        component: FuelCosts
      },
      {
        path: '/admin/arac',
        name: 'arac',
        component: Vehicle
      },
      {
        path: '/admin/arac_ara',
        name: 'aracAraAdmin',
        component: SearchCar,

        children: [
          {
            path: '/admin/arac_ara/arac_gorev',
            name: 'aracGorevAdmin',
            component: VehicleMission
          },
          {
            path: '/admin/arac_ara/arac_bakim',
            name: 'aracBakimAdmin',
            component: VehicleMaintenance
          },
          {
            path: '/admin/arac_ara/arac_ceza',
            name: 'aracCezaAdmin',
            component: VehicleCitation
          },
          {
            path: '/admin/arac_ara/arac_yakit',
            name: 'aracYakitAdmin',
            component: VehicleFuelUsage
          },
          {
            path: '/admin/arac_ara/arac_muayene',
            name: 'aracMuayeneAdmin',
            component: VehicleInspection
          },
          {
            path: '/admin/arac_ara/arac_lastik',
            name: 'aracLastikAdmin',
            component: VehicleTireData
          },
          {
            path: '/admin/arac_ara/arac_yag',
            name: 'aracYagAdmin',
            component: VehicleOilInfo
          },
        ]
      },
      {
        path: '/admin/faaliyetRaporu',
        name: 'faaliyetRaporu',
        component: ActivityReport
      },
      {
        path: '/admin/otobus_gecis_belirleme',
        name: 'personelServisHizmeti',
        component: PersonnelService
      },
      {
        path: '/admin/sifre_degistir',
        name: 'sifreDegistirAdmin',
        component: ChangePassword
      },
    ]
  },
  {
    path: '/birim',
    name: 'birim',
    component: Birim,

    children:[
      {
        path: '',
        name: 'birim',
        component: Birim
      },
      {
        path: '/birim/sifre_degistir',
        name: 'sifreDegistirBirim',
        component: ChangePassword
      },
      {
        path: '/birim/arac_ara',
        name: 'aracAraBirim',
        component: SearchCar,

        children: [
          {
            path: '/birim/arac_ara/arac_gorev',
            name: 'aracGorevBirim',
            component: VehicleMission
          },
          {
            path: '/birim/arac_ara/arac_bakim',
            name: 'aracBakimBirim',
            component: VehicleMaintenance
          },
          {
            path: '/birim/arac_ara/arac_ceza',
            name: 'aracCezaBirim',
            component: VehicleCitation
          },
          {
            path: '/birim/arac_ara/arac_yakit',
            name: 'aracYakitBirim',
            component: VehicleFuelUsage
          },
          {
            path: '/birim/arac_ara/arac_muayene',
            name: 'aracMuayeneBirim',
            component: VehicleInspection
          },
          {
            path: '/birim/arac_ara/arac_lastik',
            name: 'aracLastikBirim',
            component: VehicleTireData
          },
          {
            path: '/birim/arac_ara/arac_yag',
            name: 'aracYagBirim',
            component: VehicleOilInfo
          },
        ]
      },
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
