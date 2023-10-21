import { ref } from 'vue'
import axios from 'axios'

const getUnits = () => {
    const drivers = ref([])
    const errorDriver = ref(null)
    const loadDrivers = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request
            })
            .catch(error => console.log(error))

            drivers.value = res.data
        }
        catch(err) {
            errorUnit.value = err.message
        }
    }

    return { drivers, errorDriver, loadDrivers }
}

export default getUnits