import { ref } from 'vue'
import axios from 'axios'

const getMissions = () => {
    const missions = ref([])
    const loadMissions = async (url, request, id, year) => {
        try {
            const res = await axios.post(url, {
                request: request,
                id: id,
                year: year
            })
            missions.value = res.data
        }
        catch(err) {
           console.log(err)
        }
    }

    return { missions, loadMissions }
}

export default getMissions