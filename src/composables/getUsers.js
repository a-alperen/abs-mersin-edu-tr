import { ref } from 'vue'
import axios from 'axios'

const getUsers = () => {
    const users = ref([])
    const errorUser = ref(null)
    const loadUsers = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request
            })
            .catch(error => console.log(error))

            users.value = res.data
        }
        catch(err) {
            errorUser.value = err.message
        }
    }

    return { users, errorUser, loadUsers }
}

export default getUsers