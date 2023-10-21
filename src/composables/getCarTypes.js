import { ref } from 'vue'
import axios from 'axios'

const getCarTypes = () => {
    const cars = ref([])
    const errorCarTypes = ref(null)
    const loadCarTypes = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request
            })
            .catch(error => console.log(error))

            cars.value = res.data
        }
        catch(err) {
            errorCarTypes.value = err.message
        }
    }

    return { cars, errorCarTypes, loadCarTypes }
}

export default getCarTypes