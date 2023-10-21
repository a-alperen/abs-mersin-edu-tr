import { ref } from 'vue'
import axios from 'axios'

const getUnits = () => {
    const units = ref([])
    const errorUnit = ref(null)
    const loadUnits = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request
            })
            .catch(error => console.log(error))
            
            units.value = res.data
        }
        catch(err) {
            errorUnit.value = err.message
        }
    }
    
    return { units, errorUnit, loadUnits }
}

export default getUnits