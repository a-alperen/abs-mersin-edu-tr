import { ref } from 'vue'
import axios from 'axios'

const getFuelCosts = () => {
    const costs = ref([])
    const errorFuelCosts = ref(null)
    const loadFuelCosts = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request
            })
            .catch(error => console.log(error))

            costs.value = res.data
        }
        catch(err) {
            errorFuelCosts.value = err.message
        }
    }

    return { costs, errorFuelCosts, loadFuelCosts }
}

export default getFuelCosts