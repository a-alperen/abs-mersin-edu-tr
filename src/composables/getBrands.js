import { ref } from 'vue'
import axios from 'axios'

const getBrands = () => {
    const brands = ref([])
    const errorBrand = ref(null)
    const loadBrands = async (url, request) => {
        try {
            const res = await axios.post(url, {
                request: request
            })
            .catch(error => console.log(error))

            brands.value = res.data
        }
        catch(err) {
            errorBrand.value = err.message
        }
    }

    return { brands, errorBrand, loadBrands }
}

export default getBrands