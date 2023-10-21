import { ref } from 'vue'
import axios from 'axios'

const getFuelTypes = () => {
    const fuels = ref([])
    const errorFuelTypes = ref(null)
    const loadFuelTypes = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request
            })
            .catch(error => console.log(error))

            fuels.value = res.data
        }
        catch(err) {
            errorFuelTypes.value = err.message
        }
    }

    return { fuels, errorFuelTypes, loadFuelTypes }
}

export default getFuelTypes