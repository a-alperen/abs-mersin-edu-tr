import { ref } from 'vue'
import axios from 'axios'

const getVehicles = () => {
    const vehicles = ref([])
    const errorVehicle = ref(null)
    const loadVehicles = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request
            })
            vehicles.value = res.data
        }
        catch(err) {
            errorVehicle.value = err.message
        }
    }

    return { vehicles, errorVehicle, loadVehicles }
}

export default getVehicles