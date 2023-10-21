import { ref } from 'vue'
import axios from 'axios'

const getSharedStorages = () => {
    const sharedStorage = ref([])
    const loadSharedStorages = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request
            })
            .catch(error => console.log(error))
            
            sharedStorage.value = res.data
        }
        catch(err) {
            console.log(err.message)
        }
    }
    
    return { sharedStorage, loadSharedStorages }
}

export default getSharedStorages