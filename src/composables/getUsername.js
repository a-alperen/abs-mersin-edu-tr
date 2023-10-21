import { ref } from 'vue'
import axios from 'axios'

const getUsername = () => {
    const username = ref('')
    const errorUsername = ref(null)
    const loadUsername = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request,
                id: localStorage.getItem('kid')
            })
            .catch(error => console.log(error))

            username.value = res.data.username
        }
        catch(err) {
            errorUsername.value = err.message
        }
    }

    return { username, errorUsername, loadUsername }
}

export default getUsername